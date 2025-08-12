import { useState, useEffect, useRef } from 'react';
import {
  Card,
  Stack,
  Group,
  Button,
  TextInput,
  Select,
  Modal,
  Text,
  Badge,
  ActionIcon,
  Alert,
  NumberInput,
  Grid,
  Title,
  Divider,
  Paper,
  Center,
  Box
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconTrash, IconClock, IconBell, IconPhone, IconCheck } from '@tabler/icons-react';

interface Timer {
  id: string;
  reference: string;
  duration: number; // in seconds
  startTime: number;
  isActive: boolean;
  isExpired: boolean;
}

export function CallbackTimer() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [acknowledgeModal, setAcknowledgeModal] = useState<string | null>(null);
  const [showCustomTime, setShowCustomTime] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const form = useForm({
    initialValues: {
      reference: '',
      timePreset: '',
      customHours: 0,
      customMinutes: 5,
      customSeconds: 0,
    },
    validate: {
      reference: (value) => (value.trim().length < 1 ? 'Reference number is required' : null),
      timePreset: (value) => (!value && !showCustomTime ? 'Please select a time or choose custom' : null),
      customMinutes: (value) => (showCustomTime && value === 0 && form.values.customHours === 0 && form.values.customSeconds === 0 ? 'Please set a valid time' : null),
    },
  });

  // Initialize audio
  useEffect(() => {
    // Create a simple beep sound using Web Audio API
    const createBeepSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    };

    audioRef.current = { play: createBeepSound } as any;
  }, []);

  // Timer update effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimers(prevTimers => {
        return prevTimers.map(timer => {
          if (!timer.isActive || timer.isExpired) return timer;
          
          const elapsed = Date.now() - timer.startTime;
          const remaining = timer.duration * 1000 - elapsed;
          
          if (remaining <= 0 && !timer.isExpired) {
            // Timer expired
            if (audioRef.current) {
              try {
                audioRef.current.play();
              } catch (error) {
                console.log('Audio play failed:', error);
              }
            }
            
            notifications.show({
              title: 'Callback Timer Expired!',
              message: `Timer for ${timer.reference} has expired`,
              color: 'red',
              autoClose: false,
            });
            
            setAcknowledgeModal(timer.id);
            
            return { ...timer, isExpired: true };
          }
          
          return timer;
        });
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleSubmit = (values: typeof form.values) => {
    let durationInSeconds = 0;
    
    if (showCustomTime) {
      durationInSeconds = (values.customHours * 3600) + (values.customMinutes * 60) + values.customSeconds;
    } else {
      switch (values.timePreset) {
        case '5min':
          durationInSeconds = 5 * 60;
          break;
        case '10min':
          durationInSeconds = 10 * 60;
          break;
        case '1hr':
          durationInSeconds = 60 * 60;
          break;
        default:
          return;
      }
    }

    if (durationInSeconds <= 0) {
      form.setFieldError('customMinutes', 'Please set a valid time');
      return;
    }

    const newTimer: Timer = {
      id: Date.now().toString(),
      reference: values.reference.trim(),
      duration: durationInSeconds,
      startTime: Date.now(),
      isActive: true,
      isExpired: false,
    };

    setTimers(prev => [...prev, newTimer]);
    form.reset();
    setShowCustomTime(false);
    setModalOpened(false);
    
    notifications.show({
      title: 'Timer Started',
      message: `Callback timer for ${newTimer.reference} has been started`,
      color: 'green',
    });
  };

  const handleTimePresetChange = (value: string | null) => {
    form.setFieldValue('timePreset', value || '');
    setShowCustomTime(value === 'custom');
  };

  const removeTimer = (id: string) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  };

  const acknowledgeTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id ? { ...timer, isActive: false } : timer
    ));
    setAcknowledgeModal(null);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getRemainingTime = (timer: Timer) => {
    if (!timer.isActive || timer.isExpired) return 0;
    
    const elapsed = Date.now() - timer.startTime;
    const remaining = Math.max(0, timer.duration - Math.floor(elapsed / 1000));
    return remaining;
  };

  const getTimerStatus = (timer: Timer) => {
    if (timer.isExpired) return { color: 'red', text: 'EXPIRED' };
    if (!timer.isActive) return { color: 'gray', text: 'STOPPED' };
    return { color: 'green', text: 'ACTIVE' };
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <div>
          <Title order={3}>Callback Timer</Title>
          <Text c="dimmed" size="sm">Set reminders for customer callbacks</Text>
        </div>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setModalOpened(true)}
        >
          Add Timer
        </Button>
      </Group>

      <Divider />

      {timers.length === 0 ? (
        <Paper p="xl" radius="md" style={{ border: '2px dashed var(--mantine-color-gray-4)' }}>
          <Center>
            <Stack align="center" gap="md">
              <IconClock size={48} color="var(--mantine-color-gray-5)" />
              <Text c="dimmed" ta="center">
                No active timers. Click "Add Timer" to create your first callback reminder.
              </Text>
            </Stack>
          </Center>
        </Paper>
      ) : (
        <Grid>
          {timers.map((timer) => {
            const remaining = getRemainingTime(timer);
            const status = getTimerStatus(timer);
            
            return (
              <Grid.Col key={timer.id} span={{ base: 12, sm: 6, lg: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="sm">
                    <Group justify="space-between" align="flex-start">
                      <div style={{ flex: 1 }}>
                        <Text fw={600} size="sm" c="dimmed" tt="uppercase">
                          Reference
                        </Text>
                        <Text fw={500} lineClamp={2}>
                          {timer.reference}
                        </Text>
                      </div>
                      <ActionIcon
                        color="red"
                        variant="light"
                        size="sm"
                        onClick={() => removeTimer(timer.id)}
                      >
                        <IconTrash size={14} />
                      </ActionIcon>
                    </Group>

                    <Box>
                      <Text fw={600} size="sm" c="dimmed" tt="uppercase" mb={4}>
                        Time Remaining
                      </Text>
                      <Text 
                        size="xl" 
                        fw={700} 
                        c={timer.isExpired ? 'red' : remaining < 60 ? 'orange' : 'blue'}
                        style={{ fontFamily: 'monospace' }}
                      >
                        {timer.isExpired ? '00:00' : formatTime(remaining)}
                      </Text>
                    </Box>

                    <Group justify="space-between" align="center">
                      <Badge
                        color={status.color}
                        variant={timer.isExpired ? 'filled' : 'light'}
                        leftSection={timer.isExpired ? <IconBell size={12} /> : <IconClock size={12} />}
                      >
                        {status.text}
                      </Badge>
                      
                      {timer.isExpired && (
                        <Button
                          size="xs"
                          color="red"
                          leftSection={<IconCheck size={14} />}
                          onClick={() => acknowledgeTimer(timer.id)}
                        >
                          Acknowledge
                        </Button>
                      )}
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      )}

      {/* Add Timer Modal */}
      <Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          form.reset();
          setShowCustomTime(false);
        }}
        title={
          <Group gap="sm">
            <IconPhone size={20} />
            <Text fw={600}>Add Callback Timer</Text>
          </Group>
        }
        centered
        size="md"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Reference Number"
              placeholder="Enter customer reference or ticket number"
              required
              {...form.getInputProps('reference')}
            />

            <Select
              label="Callback Time"
              placeholder="Select callback time"
              data={[
                { value: '5min', label: '5 minutes' },
                { value: '10min', label: '10 minutes' },
                { value: '1hr', label: '1 hour' },
                { value: 'custom', label: 'Custom time' },
              ]}
              value={form.values.timePreset}
              onChange={handleTimePresetChange}
              required={!showCustomTime}
            />

            {showCustomTime && (
              <Card withBorder p="md">
                <Text size="sm" fw={500} mb="sm">Custom Time</Text>
                <Group grow>
                  <NumberInput
                    label="Hours"
                    min={0}
                    max={23}
                    {...form.getInputProps('customHours')}
                  />
                  <NumberInput
                    label="Minutes"
                    min={0}
                    max={59}
                    {...form.getInputProps('customMinutes')}
                  />
                  <NumberInput
                    label="Seconds"
                    min={0}
                    max={59}
                    {...form.getInputProps('customSeconds')}
                  />
                </Group>
              </Card>
            )}

            <Group justify="flex-end" gap="sm">
              <Button
                variant="light"
                onClick={() => {
                  setModalOpened(false);
                  form.reset();
                  setShowCustomTime(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" leftSection={<IconClock size={16} />}>
                Start Timer
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Acknowledge Modal */}
      <Modal
        opened={!!acknowledgeModal}
        onClose={() => {}}
        title={
          <Group gap="sm">
            <IconBell size={20} color="red" />
            <Text fw={600} c="red">Timer Expired!</Text>
          </Group>
        }
        centered
        size="sm"
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
      >
        <Stack gap="md">
          <Alert color="red" icon={<IconBell size={16} />}>
            <Text fw={500}>
              Your callback timer has expired. Please acknowledge to stop the notification.
            </Text>
          </Alert>
          
          {acknowledgeModal && (
            <Text size="sm" c="dimmed">
              Reference: {timers.find(t => t.id === acknowledgeModal)?.reference}
            </Text>
          )}

          <Button
            color="red"
            fullWidth
            leftSection={<IconCheck size={16} />}
            onClick={() => acknowledgeModal && acknowledgeTimer(acknowledgeModal)}
          >
            Acknowledge & Stop Timer
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
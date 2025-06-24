import { Button } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

export function AdminButton() {
  const handleAdminClick = () => {
    window.open('/admin/', '_blank');
  };

  return (
    <Button
      variant="light"
      size="sm"
      leftSection={<IconEdit size={16} />}
      onClick={handleAdminClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }}
    >
      Edit Docs
    </Button>
  );
}
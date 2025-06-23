import { Burger, Container, Group, Text, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useLocation } from 'react-router-dom';
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/', label: 'Database' },
  { link: '/docs', label: 'Docs' },
];

export function HeaderSimple() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={location.pathname === link.link || undefined}
      onClick={close}
    >
      {link.label}
    </Link>
  ));

  const mobileItems = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.mobileLink}
      data-active={location.pathname === link.link || undefined}
      onClick={close}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <Link to="/" className={classes.logo}>
            <Text fw={700} size="lg" component="span">JLDB</Text>
          </Link>
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Container>
      </header>

      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Link to="/" className={classes.logo} onClick={close}>
            <Text fw={700} size="lg" component="span">JLDB</Text>
          </Link>
        }
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <Stack gap="md">
          {mobileItems}
        </Stack>
      </Drawer>
    </>
  );
}
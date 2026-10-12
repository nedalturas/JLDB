import { Container, Text, Anchor, Indicator } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import classes from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Storage key is versioned (v1) so you can increment it (v2, v3) on future updates
  const [hasSeenNedDevLink, setHasSeenNedDevLink] = useLocalStorage<boolean>({
    key: 'seen_footer_ned_dev_v1',
    defaultValue: false,
  });

  const handleLinkClick = () => {
    if (!hasSeenNedDevLink) {
      setHasSeenNedDevLink(true);
    }
  };

  return (
    <footer className={classes.footer}>
      <Container size="lg">
        <div className={classes.bottomSection}>
          <Text className={classes.copyright}>
            © {currentYear} JLDB. All rights reserved.{' '}
            <Indicator
              inline
              size={6}
              color="blue"
              offset={-2}
              processing
              disabled={hasSeenNedDevLink}
              aria-label="New link update"
            >
              <Anchor
                href="https://nedalturas.github.io/anti-claim/"
                target="_blank"
                color="inherit"
                onClick={handleLinkClick}
              >
                ned.dev
              </Anchor>
            </Indicator>
          </Text>
        </div>
      </Container>
    </footer>
  );
}

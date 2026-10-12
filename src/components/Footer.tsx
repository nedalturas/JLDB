import { Container, Text, Anchor } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <Container size="lg">

        <div className={classes.bottomSection}>
          <Text className={classes.copyright}>
            © {currentYear} JLDB. All rights reserved. <Anchor href="https://nedalturas.github.io/anti-claim/" target="_blank" color="inherit">ned.dev</Anchor>
          </Text>
         
        </div>
      </Container>
    </footer>
  );
}

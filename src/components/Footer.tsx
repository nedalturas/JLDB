import { Container, Text, Anchor } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <Container size="lg">

        <div className={classes.bottomSection}>
          <Text className={classes.copyright}>
            © {currentYear} JLDB. All rights reserved. <Anchor href="http://httpwanderer.dev" target="_blank" color="inherit">httpwanderer.dev</Anchor>
          </Text>
         
        </div>
      </Container>
    </footer>
  );
}
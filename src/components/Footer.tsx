import { Container, Text, } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <Container size="lg">

        <div className={classes.bottomSection}>
          <Text className={classes.copyright}>
            © {currentYear} JLDB. All rights reserved.
          </Text>
         
        </div>
      </Container>
    </footer>
  );
}
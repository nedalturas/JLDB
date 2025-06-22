import {  Container, Image, SimpleGrid, Text, Title } from '@mantine/core';
// import image from '../assets/notfound.svg'
import classes from './NotFound.module.css';

import { Link, useLocation } from 'react-router-dom';
export default function NotFound() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src="https://raw.githubusercontent.com/mantinedev/ui.mantine.dev/620ed0fa88be1e484bddc711af6f0903c037f04e/lib/NotFoundImage/image.svg" className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Link  to="/" variant="outline" size="md" mt="xl" className={classes.control}>
            Get back to home page
          </Link>
        </div>
        <Image src="https://raw.githubusercontent.com/mantinedev/ui.mantine.dev/620ed0fa88be1e484bddc711af6f0903c037f04e/lib/NotFoundImage/image.svg" className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}

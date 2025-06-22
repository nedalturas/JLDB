import { Container, Text, Group, ActionIcon } from '@mantine/core';
import { IconBrandTwitter, IconBrandLinkedin, IconBrandInstagram, IconMail } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <Container size="lg">
        <div className={classes.footerContent}>
          <div className={classes.section}>
            <Text className={classes.sectionTitle}>JLDB</Text>
            <Text size="sm" c="dimmed" mb="md">
              Your trusted platform for finding verified service providers across the UAE. 
              Connecting customers with quality professionals since 2024.
            </Text>
            <div className={classes.socialLinks}>
              <ActionIcon
                size="lg"
                variant="subtle"
                component="a"
                href="https://twitter.com/jldb"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialLink}
              >
                <IconBrandTwitter size={20} />
              </ActionIcon>
              <ActionIcon
                size="lg"
                variant="subtle"
                component="a"
                href="https://linkedin.com/company/jldb"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialLink}
              >
                <IconBrandLinkedin size={20} />
              </ActionIcon>
              <ActionIcon
                size="lg"
                variant="subtle"
                component="a"
                href="https://instagram.com/jldb"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialLink}
              >
                <IconBrandInstagram size={20} />
              </ActionIcon>
              <ActionIcon
                size="lg"
                variant="subtle"
                component="a"
                href="mailto:info@jldb.com"
                className={classes.socialLink}
              >
                <IconMail size={20} />
              </ActionIcon>
            </div>
          </div>

          <div className={classes.section}>
            <Text className={classes.sectionTitle}>Platform</Text>
            <ul className={classes.linkList}>
              <li className={classes.linkItem}>
                <Link to="/" className={classes.link}>
                  Browse Database
                </Link>
              </li>
              <li className={classes.linkItem}>
                <Link to="/docs" className={classes.link}>
                  Documentation
                </Link>
              </li>
              <li className={classes.linkItem}>
                <a href="#" className={classes.link}>
                  API Access
                </a>
              </li>
              <li className={classes.linkItem}>
                <a href="#" className={classes.link}>
                  Mobile App
                </a>
              </li>
            </ul>
          </div>

          <div className={classes.section}>
            <Text className={classes.sectionTitle}>Services</Text>
            <ul className={classes.linkList}>
              <li className={classes.linkItem}>
                <a href="#" className={classes.link}>
                  Cleaning Services
                </a>
              </li>
              <li className={classes.linkItem}>
                <a href="#" className={classes.link}>
                  Plumbing
                </a>
              </li>
              <li className={classes.linkItem}>
                <a href="#" className={classes.link}>
                  Electrical
                </a>
              </li>
              <li className={classes.linkItem}>
                <a href="#" className={classes.link}>
                  HVAC
                </a>
              </li>
              <li className={classes.linkItem}>
                <a href="#" className={classes.link}>
                  General Maintenance
                </a>
              </li>
            </ul>
          </div>

          <div className={classes.section}>
            <Text className={classes.sectionTitle}>Support</Text>
            <ul className={classes.linkList}>
              <li className={classes.linkItem}>
                <a href="#" className={classes.link}>
                  Help Center
                </a>
              </li>
              <li className={classes.linkItem}>
                <a href="#" className={classes.link}>
                  Contact Us
                </a>
              </li>
              <li className={classes.linkItem}>
                <a href="#" className={classes.link}>
                  Report Issue
                </a>
              </li>
              <li className={classes.linkItem}>
                <a href="#" className={classes.link}>
                  Status Page
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={classes.divider}></div>

        <div className={classes.bottomSection}>
          <Text className={classes.copyright}>
            © {currentYear} JLDB. All rights reserved.
          </Text>
          <div className={classes.bottomLinks}>
            <a href="#" className={classes.bottomLink}>
              Privacy Policy
            </a>
            <a href="#" className={classes.bottomLink}>
              Terms of Service
            </a>
            <a href="#" className={classes.bottomLink}>
              Cookie Policy
            </a>
            <a href="#" className={classes.bottomLink}>
              Sitemap
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
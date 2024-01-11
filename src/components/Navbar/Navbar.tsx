import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HoverCard,
  Group,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  noop,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import {
//   IconNotification,
//   IconCode,
//   IconBook,
//   IconChartPie3,
//   IconFingerprint,
//   IconCoin,
//   IconChevronDown,
// } from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import Button from '../Button/Button';
import NavbarLogo from '../../assets/navbar-logo.png';

const Navbar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <>
      <Box
        p={15}
        className="sticky top-0 font-nun"
        style={{
          color: 'silver',
          backgroundColor: '#001124',
          borderBottom: '1px solid silver',
        }}
      >
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Group>
              <Link to="/" className="flex place-items-center gap-3">
                <img src={NavbarLogo} className="w-10" alt="P" />
                <span className="text-xl">Polling Application</span>
              </Link>
            </Group>

            <Group h="100%" gap={30} visibleFrom="sm">
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <Link className="text-md" to="/">
                  Home
                </Link>
                <Link className="text-md" to="/Dashboard">
                  Dashboard
                </Link>
                <Link className="text-md" to="/Profile">
                  Profile
                </Link>
              </HoverCard>
            </Group>

              <Group visibleFrom="sm">
                <Link
                  className="font-nun rounded-md overflow-hidden"
                  to="/Login"
                >
                  <Button label="Log In" onClick={noop} />
                </Link>
                <Link
                  className="font-nun rounded-md overflow-hidden"
                  to="/Signup"
                >
                  <Button label="Sign Up" onClick={noop} />
                </Link>
              </Group>
              {/* <Box visibleFrom="sm" className="font-nun rounded-md overflow-hidden">
                <Button label="Log Out" onClick={handleLogOut} />
              </Box> */}

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
              color="#dadada"
            />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="sm"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider />

            <Box className="flex align-start flex-col">
              <Link className="p-1 m-1 text-md font-nun" to="/">
                Home
              </Link>
              <Link
                className="p-1 m-1 text-md font-nun hover:bg-#001124"
                to="/Dashboard"
              >
                Dashboard
              </Link>
              <Link
                className="p-1 m-1 text-md font-nun hover: bg-#001124"
                to="/Profile"
              >
                Profile
              </Link>
            </Box>

            <Divider my="sm" />

              <Group visibleFrom="sm">
                <Link
                  className="font-nun rounded-md overflow-hidden"
                  to="/Login"
                >
                  <Button label="Log In" onClick={noop} />
                </Link>
                <Link
                  className="font-nun rounded-md overflow-hidden"
                  to="/Signup"
                >
                  <Button label="Sign Up" onClick={noop} />
                </Link>
              </Group>
              {/* <Box className="font-nun rounded-md overflow-hidden">
                <Button label="Log Out" onClick={handleLogOut} />
              </Box> */}
          </ScrollArea>
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;

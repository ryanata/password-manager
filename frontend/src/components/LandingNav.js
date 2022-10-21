import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconShield,
    IconFolder,
    IconPlane,
    IconDiscountCheck,
    IconChevronDown,
    IconSchool,
    IconBook2,
    IconClipboardList,
    IconHomeHeart,
  } from '@tabler/icons';
import { default as Logo } from '../assets/logo.svg';

  
const useStyles = createStyles((theme) => ({
    transparentColor: {
        backgroundColor: 'transparent',
    },
    
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
  
        [theme.fn.smallerThan('sm')]: {
            height: 42,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
  
        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },
  
    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.md,
  
        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),
  
        '&:active': theme.activeStyles,
    },
  
    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: -theme.spacing.md,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
        }`,
    },
  
    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
  
    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
     },
}));
  
    const featuresdata = [
        {
            icon: IconShield,
            title: 'Multi-factor authentication',
            description: 'Secure vaults and account with 2FA',
        },
        {
            icon: IconDiscountCheck,
            title: 'Password checking',
            description: 'Ensure your passwords are hard to crack',
        },
        {
            icon: IconFolder,
            title: 'Password grouping',
            description: 'Organize your life into vaults and folders',
        },
        {
            icon: IconPlane,
            title: 'Travel mode',
            description: 'Hide your passwords when traveling abroad',
        },
    ];

    const solutionsdata = [
        {
            icon: IconSchool,
            title: 'Students',
            description: 'Store your passwords for all your school resources',
        },
        {
            icon: IconBook2,
            title: 'Teachers',
            description: 'Leverage vaults for your classes and students',
        },
        {
            icon: IconClipboardList,
            title: 'Clubs',
            description: 'Save your organization\'s passwords with MFA',
        },
        {
            icon: IconHomeHeart,
            title: 'Families',
            description: 'Connect your smart home and shared accounts',
        },
    ];

  export function LandingNav() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksFeaturesOpened, { toggle: toggleFeatures }] = useDisclosure(false);
    const [linksSolutionsOpened, { toggle: toggleSolutions }] = useDisclosure(false);

    const { classes, theme } = useStyles();
  
    const links = featuresdata.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group noWrap align="flex-start">
            <ThemeIcon size={34} variant="default" radius="md">
                <item.icon size={22} color={theme.fn.primaryColor()} />
            </ThemeIcon>
            <div>
                <Text size="sm" weight={500}>
                    {item.title}
                </Text>
                <Text size="xs" color="dimmed">
                    {item.description}
                </Text>
            </div>
        </Group>
      </UnstyledButton>
    ));

    const solutionslinks = solutionsdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
          <Group noWrap align="flex-start">
              <ThemeIcon size={34} variant="default" radius="md">
                  <item.icon size={22} color={theme.fn.primaryColor()} />
              </ThemeIcon>
              <div>
                  <Text size="sm" weight={500}>
                        {item.title}
                  </Text>
                  <Text size="xs" color="dimmed">
                        {item.description}
                  </Text>
              </div>
          </Group>
        </UnstyledButton>
      ));
  
    return (
      <Box pb={120}>
        <Header height={60} px="md" className={classes.transparentColor}>
          <Group position="apart" sx={{ height: '100%' }}>
            <img src={Logo} alt="pwdly logo"/>
  
            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                    <HoverCard.Target>
                    <a href="#" className={classes.link}>
                        <Center inline>
                        <Box component="span" mr={5}>
                            Features
                        </Box>
                        <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                        </Center>
                    </a>
                    </HoverCard.Target>
    
                    <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                    <Group position="apart" px="md">
                        <Text weight={500}>Features</Text>
                    </Group>
    
                    <Divider
                        my="sm"
                        mx="-md"
                        color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                    />
    
                    <SimpleGrid cols={2} spacing={0}>
                        {links}
                    </SimpleGrid>
    
                    </HoverCard.Dropdown>
                </HoverCard>
              
                <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                    <HoverCard.Target>
                        <a href="#" className={classes.link}>
                            <Center inline>
                            <Box component="span" mr={5}>
                                Solutions
                            </Box>
                            <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                            </Center>
                        </a>
                    </HoverCard.Target>
    
                    <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                    <Group position="apart" px="md">
                        <Text weight={500}>Solutions</Text>
                    </Group>
    
                    <Divider
                        my="sm"
                        mx="-md"
                        color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                    />
    
                    <SimpleGrid cols={2} spacing={0}>
                        {solutionslinks}
                    </SimpleGrid>
    
                    </HoverCard.Dropdown>
                </HoverCard>

                <a href="#" className={classes.link}>
                    About Us
                </a>
            </Group>
  
            <Group className={classes.hiddenMobile}>
                <Button variant="white" radius='xl' className={classes.transparentColor}>Log in</Button>
                <Button variant="light" radius='xl'>Sign up</Button>
            </Group>
  
            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Group>
        </Header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
  
            <UnstyledButton className={classes.link} onClick={toggleFeatures}>
                <Center inline>
                    <Box component="span" mr={5}>
                        Features
                    </Box>
                    <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                </Center>
            </UnstyledButton>
            <Collapse in={linksFeaturesOpened}>{links}</Collapse>

            <UnstyledButton className={classes.link} onClick={toggleSolutions}>
                <Center inline>
                    <Box component="span" mr={5}>
                        Solutions
                    </Box>
                    <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                </Center>
            </UnstyledButton>
            <Collapse in={linksSolutionsOpened}>{solutionslinks}</Collapse>

            <a href="#" className={classes.link}>
                About Us
            </a>
  
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
  
            <Group position="center" grow pb="xl" px="md">
                <Button variant="white" radius='xl' className={classes.transparentColor}>Log in</Button>
                <Button variant="light" radius='xl'>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
}

import { Badge, Card, Container, Group, SimpleGrid, Text, Title, createStyles } from "@mantine/core";
import { IconDiscountCheck, IconFolder, IconPlane, IconShield } from "@tabler/icons";

const mockdata = [
    {
        title: "Multi-Factor Authentication",
        description:
            "Add an extra layer of security to your account by requiring a second login step before authorizing access to your vaults.",
        icon: IconShield,
    },
    {
        title: "Password Grouping",
        description:
            "With our vault system, you can group your passwords into categories. That way, you can easily find the password you need.",
        icon: IconFolder,
    },
    {
        title: "Password Checking",
        description:
            "Create strong passwords that are hard to crack with our password generator. Fully customizable, you can create a password that is unique and secure.",
        icon: IconDiscountCheck,
    },
    {
        title: "Travel Mode",
        description:
            "If you travel often, you can enable travel mode. This will automatically delete your passwords for a certain amount of time to ensure privacy when going through security.",
        icon: IconPlane,
    },
];

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 34,
        fontWeight: 900,
        [theme.fn.smallerThan("sm")]: {
            fontSize: 24,
        },
    },

    description: {
        maxWidth: 600,
        margin: "auto",

        "&::after": {
            content: '""',
            display: "block",
            backgroundColor: theme.fn.primaryColor(),
            width: 45,
            height: 2,
            marginTop: theme.spacing.sm,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },

    card: {
        border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}`,
    },

    cardTitle: {
        "&::after": {
            content: '""',
            display: "block",
            backgroundColor: theme.fn.primaryColor(),
            width: 45,
            height: 2,
            marginTop: theme.spacing.sm,
        },
    },

    hiddenMobile: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    outerGrid: {
        maxWidth: "100%",
    },
}));

export function FeaturesDescription() {
    const { classes, theme } = useStyles();
    const features = mockdata.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} p="xl">
            <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
            <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text size="sm" color="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));
    return (
        <Container size="lg" py="xl">
            <Group position="center">
                <Badge variant="filled" size="lg">
                    Features
                </Badge>
            </Group>

            <Title color="white" order={2} className={classes.title} align="center" mt="sm">
                Easiest way to manage your passwords.
            </Title>

            <Text color="white" className={classes.description} align="center" mt="md">
                With pwdly, manage all of your passwords in one place. You can store, organize, and secure your
                passwords with ease.
            </Text>

            <SimpleGrid cols={4} spacing="xl" mt={50} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
                {features}
            </SimpleGrid>
        </Container>
    );
}

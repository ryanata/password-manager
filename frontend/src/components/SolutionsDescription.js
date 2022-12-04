import { Badge, Card, Container, Group, SimpleGrid, Text, Title, createStyles } from "@mantine/core";
import { IconBook2, IconClipboardList, IconHomeHeart, IconSchool } from "@tabler/icons";

const mockdata = [
    {
        title: "Students",
        description:
            "Organize all of your school passwords in different vaults to make it easy to access whatever learning resource you need.",
        icon: IconSchool,
    },
    {
        title: "Clubs",
        description:
            "Share your passwords with your club members in one go. You can also create a club password vault to share with your club members.",
        icon: IconClipboardList,
    },
    {
        title: "Teachers",
        description:
            "With many school resources becoming available online, you can create easily accessible passwords for your students to use in your class.",
        icon: IconBook2,
    },
    {
        title: "Families",
        description:
            "Store and share passwords for streaming services, medical accounts, and credit cards and organize them into vaults for easy access for all family members.",
        icon: IconHomeHeart,
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

export function SolutionsDescription() {
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
                    Solutions
                </Badge>
            </Group>

            <Title color="white" order={2} className={classes.title} align="center" mt="sm">
                Password management for everyone.
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

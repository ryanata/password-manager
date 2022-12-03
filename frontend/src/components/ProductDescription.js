import { Button, Grid, Group, Image, Text, Title, createStyles } from "@mantine/core";

import { default as landingMock } from "../assets/mocksLanding.png";

const useStyles = createStyles((theme) => ({
    hiddenMobile: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    outerGrid: {
        maxWidth: "100%",
    },
    control: {
        [theme.fn.smallerThan("xs")]: {
            flex: 1,
        },
    },
}));

export function ProductDescription() {
    const { classes, theme } = useStyles();
    const mobilePadding = 20;
    const desktopPadding = 50;
    return (
        <>
            <Grid grow gutter={40} m={0} className={classes.outerGrid}>
                <Grid.Col span={3}>
                    <Title
                        sx={{
                            color: "#ffffff",
                            fontSize: 50,
                            lineHeight: 1.2,
                            float: "left",
                            fontFamily: "nunito",
                            textAlign: "left",
                            paddingLeft: desktopPadding,
                            [theme.fn.smallerThan("sm")]: {
                                paddingLeft: mobilePadding,
                                fontSize: 40,
                            },
                        }}
                    >
                        Take your passwords everywhere, safe.
                    </Title>
                    <Text
                        sx={{
                            color: "#ffffff",
                            fontSize: 26,
                            lineHeight: 1.6,
                            float: "left",
                            fontFamily: "public sans",
                            textAlign: "left",
                            paddingLeft: desktopPadding,
                            [theme.fn.smallerThan("sm")]: {
                                paddingLeft: mobilePadding,
                                fontSize: 22,
                            },
                            paddingTop: 30,
                            paddingBottom: 30,
                        }}
                    >
                        The only password manager you need for all your life chapters. Learn how you can store,
                        organize, and secure your life with{" "}
                        <Text weight={600} component="span">
                            pwdly
                        </Text>
                        .
                    </Text>
                    <Group
                        sx={{
                            width: "100%",
                            paddingLeft: desktopPadding,
                            [theme.fn.smallerThan("sm")]: {
                                paddingLeft: mobilePadding,
                            },
                        }}
                    >
                        <Button
                            sx={{
                                color: "#ffffff",
                                backgroundColor: "#052754",
                                fontFamily: "nunito",
                                fontSize: 25,
                                [theme.fn.smallerThan("sm")]: {
                                    fontSize: 20,
                                },
                            }}
                            radius="xl"
                            size="md"
                            className={classes.control}
                        >
                            Learn More
                        </Button>
                        <Button
                            radius="xl"
                            size="md"
                            className={classes.control}
                            sx={{
                                color: "#4681D0",
                                backgroundColor: "#ffffff",
                                fontFamily: "nunito",
                                fontSize: 25,
                                [theme.fn.smallerThan("sm")]: {
                                    fontSize: 20,
                                },
                                "&:hover": {
                                    color: "#ffffff",
                                },
                            }}
                        >
                            Get Started
                        </Button>
                    </Group>
                </Grid.Col>
                <Grid.Col span={3} className={classes.hiddenMobile}>
                    <Image width="110%" src={landingMock} alt="Mobile and Web Mocks" />
                </Grid.Col>
            </Grid>
        </>
    );
}

import { Badge, Container, Group, Avatar, Text, Title, Accordion, createStyles } from '@mantine/core';

const charactersList = [
  {
    id: 'ryan',
    image: 'https://img.icons8.com/clouds/256/000000/cutting-board.png',
    label: 'Ryan Ata',
    description: 'Project Manager',
    content: "I'm a Junior at UCF majoring in Computer Science. I was the project manager of pwdly and did a lot of work in the frontend. In my free time, I enjoy cooking and trying new foods.",
  },

  {
    id: 'adam',
    image: 'https://img.icons8.com/clouds/256/000000/spachelor.png',
    label: 'Adam Lei',
    description: 'Database',
    content: "I am a Junior at UCF majoring in Computer Science. I worked on the database and helped out in the frontend and mobile application. I enjoy cooking dishes in my free time.",
  },

  {
    id: 'camila',
    image: 'https://img.icons8.com/clouds/256/000000/cat.png',
    label: 'Camila Sinelli',
    description: 'Frontend Developer',
    content: 'I’m a Junior at the University of Central Florida majoring in computer science. I worked in the frontend of pwdly. In my free time, I love playing with my cats and watching movies.',
  },

  {
    id: 'andrea',
    image: 'https://img.icons8.com/clouds/256/000000/piano.png',
    label: 'Andrea Donoso',
    description: 'Frontend Developer',
    content: 'I’m a Junior at the University of Central Florida majoring in computer science. I was a frontend developer of pwdly. In my free time, I love to play piano and work out.',
  },

  {
    id: 'billy',
    image: 'https://img.icons8.com/clouds/256/000000/music.png',
    label: 'Billy Furie',
    description: 'Backend Developer',
    content: 'I\'m a Junior at UCF majoring in Computer Science. In my free time I like to hang out with my friends, listen to music, and eat lots of food. I worked on the backend of pwdly.',
  },

  {
    id: 'kevin',
    image: 'https://img.icons8.com/clouds/256/000000/monitor.png',
    label: 'Kevin Lorch',
    description: 'Backend Developer',
    content: 'I’m a Senior at the University of Central Florida, and my major is in Computer Engineering. I developed for the backend of pwdly. I\'ve built my own gaming PC and in my free time, I like to listen to podcasts.',
  },

  {
    id: 'jason',
    image: 'https://img.icons8.com/clouds/256/000000/strength.png',
    label: 'Jason James',
    description: 'Backend Developer',
    content: 'I’m a Junior at UCF majoring in computer science. In my free time, I like to hang out with friends and work out. I worked on the backend of pwdly.',
  },

  {
    id: 'guidarly',
    image: 'https://img.icons8.com/clouds/256/000000/microphone.png',
    label: 'Guidarly Joseph',
    description: 'Mobile Developer',
    content: 'I’m a Junior at UCF majoring in Computer Science. I like to make music and watch anime in my free time. I developed for mobile and frontend of pwdly.',
  },
   
  {
    id: 'khaled',
    image: 'https://img.icons8.com/clouds/256/000000/literature.png',
    label: 'Khaled Tujjar',
    description: 'Mobile Developer',
    content: 'I\'m a Junior at the University of Central Florida majoring in computer science. In my free time I like to read and listen to music. I was a mobile developer for pwdly.',
  },
];

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 34,
        fontWeight: 900,
        [theme.fn.smallerThan('sm')]: {
          fontSize: 24,
        },
    },
    
    description: {
        maxWidth: 600,
        margin: 'auto',
    
    '&::after': {
            content: '""',
            display: 'block',
            width: 45,
            height: 2,
            marginTop: theme.spacing.sm,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
      },
}));

function AccordionLabel({ label, image, description }) {
  return (
    <Group noWrap>
      <Avatar src={image} radius="xl" size="lg" />
      <div>
        <Text>{label}</Text>
        <Text size="sm" color="dimmed" weight={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

function AboutUsContent() {
    const { classes } = useStyles();
    const items = charactersList.map((item) => (
        <Accordion.Item value={item.id} key={item.label}>
            <Accordion.Control>
                <AccordionLabel {...item} />
            </Accordion.Control>
            <Accordion.Panel>
                <Text size="sm">{item.content}</Text>
            </Accordion.Panel>
        </Accordion.Item>
    ));

  return (
    <>
        <Container size="lg" py="xl">
            <Group position="center">
                <Badge variant="filled" size="lg">
                    About Us
                </Badge>
            </Group>

            <Title color="white" order={2} className={classes.title} align="center" mt="sm">
                Meet the team.
            </Title>

            <Text color="white" className={classes.description} align="center" mt="md" pb="sm">
                Learn more about the engineers behind pwdly. We are a team of passionate engineers who are dedicated to building the best password manager.
            </Text>
        </Container>
        <Container size="md" pb="lg">
            <Accordion chevronPosition="right" variant="contained" radius="md" styles={{
                item: {
                    // styles added to all items
                    backgroundColor: '#fff',
                    border: '1px solid #ededed',
                    },
                }}
            >
                {items}
            </Accordion>
        </Container>
    </>
);
}

export default AboutUsContent;

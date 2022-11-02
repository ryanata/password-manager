import { 
    Text,
    Title, 
    Button,
    Grid,
    Image
 } from '@mantine/core';

export function ProductDescription() {
  return (
    <>
    
    <Grid grow gutter={40}>
        <Grid.Col span={4}>
            <Title sx={{ color: '#ffffff', fontSize: 60, lineHeight: 1.4, float: 'left', textAlign: 'left', paddingLeft: 30 }}>
                Take your passwords everywhere, safe.
            </Title>
            <Text sx={{ color: '#ffffff', fontSize: 26, lineHeight: 1.4, float: 'left',fontFamily: 'public sans', textAlign: 'left', paddingLeft: 30 }}>
                {"The only password manager you need for all your life chapters. Learn how you can store, share, and secure your life with pwdly."}
            </Text>
            <Button sx={{color: '#ffffff', backgroundColor: '#052754', marginRight: 12, marginTop: 20 ,fontFamily: 'nunito', fontSize: 30}} radius="xl">
                Learn More
            </Button>
            <Button sx={{color: '#4681D0', backgroundColor: '#ffffff', fontFamily: 'nunito', fontWeight: 700, fontSize: 30}} radius="xl" size='lg' pl="xl" pr="xl">
                Get Started
            </Button>
        </Grid.Col>
      <Grid.Col span={4}>
      <Image
        width={690}
        height={490}
        radius="md"
        src="https://cdn.dribbble.com/users/1930239/screenshots/18753108/media/23933d022522e7fb8abdd23996b6f037.png"
        alt="Random unsplash image"
      />
      </Grid.Col>
    </Grid>
    </>
  );
}
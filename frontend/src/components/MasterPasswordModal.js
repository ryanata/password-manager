import { createStyles, Button, Center, Modal, PasswordInput, Text } from "@mantine/core";
import { useState } from "react";
const useStyles = createStyles((theme) => ({}));
const MasterPasswordModal = ({ opened, closed }) => {
    const { classes, theme } = useStyles();
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    return (
        <Modal
            centered={true}
            opened={opened}
            onClose={closed}
            size="sm"
            radius="md"
            styles={{
                header: {
                    marginBottom: 0,
                },
            }}
            padding="lg"
        >
            <PasswordInput
                label="Master password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <Center mt="md">
                <Button>Submit</Button>
            </Center>

            <Text color="red">{passwordError}</Text>
        </Modal>
    );
};

export default MasterPasswordModal;

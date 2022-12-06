import { Modal, Text, Title } from "@mantine/core";

const DeleteWarning = ({ opened, closed, label, children }) => {
    return (
        <Modal
            opened={opened}
            onClose={closed}
            title="Warning"
            centered
            closeOnEscape={false}
            closeOnClickOutside={false}
            withCloseButton={false}
            size="md"
            styles={{
                title: {
                    color: "red",
                    fontWeight: 600,
                },
            }}
        >
            <Text weight={500} align="center">
                {label}
                <Text weight={700} color="red" span align="center">
                    {" This action cannot be undone!"}
                </Text>
            </Text>
            {children}
        </Modal>
    );
};

export default DeleteWarning;

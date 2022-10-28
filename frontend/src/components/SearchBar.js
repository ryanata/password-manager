import { Input, Group, Button } from '@mantine/core';
import { IconAt, IconPlus } from '@tabler/icons';

export function SearchBar() {
  return (
    <Group>
        <Input icon={<IconAt />} placeholder="Search"/>
        <Button uppercase leftIcon={<IconPlus size={28}/>}>add new</Button>
    </Group>
  );
}

 
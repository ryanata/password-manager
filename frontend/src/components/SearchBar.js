import { Input } from '@mantine/core';
import { IconAt } from '@tabler/icons';
import { Group } from '@mantine/core';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';

export function SearchBar() {
  return (
    <Group>
        <Input icon={<IconAt />} placeholder="Search"/>
        <Button uppercase leftIcon={<IconPlus size={28}/>}>add new</Button>
    </Group>
  );
}

 
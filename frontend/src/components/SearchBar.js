import { Input } from '@mantine/core';
import { IconAt } from '@tabler/icons';

export function SearchBar() {
  return (
    <Input
      icon={<IconAt />}
      placeholder="Site Name"
    />
  );
}

 
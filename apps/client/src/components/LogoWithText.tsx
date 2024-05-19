import { Group, Image, Title } from "@mantine/core";

export const LogoWithText = () => {
  return (
    <Group  gap='xs'>
      <Image src='/heartPulse.svg' alt="webpulse" style={{ width: 34, height: 34 }} />
      <Title order={1} size='h3' styles={(theme) => ({ root: { color: theme.black,  } })}>webpulse</Title>
    </Group>
  )
};

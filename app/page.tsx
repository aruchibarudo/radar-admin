'use client'
import { Grid, GridItem } from '@consta/uikit/Grid'

import RadarsList from '@/components/radars/RadarsList'
import { H1 } from '@/components/ui/Text'

export default function Home() {
  return (
    <Grid gap="m">
      <GridItem>
        <H1>Доступные радары</H1>
      </GridItem>

      <GridItem>
        <RadarsList />
      </GridItem>
    </Grid>
  )
}

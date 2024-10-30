'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { Breadcrumbs } from '@consta/uikit/Breadcrumbs'
// import { Grid, GridItem } from '@consta/uikit/Grid'
import { IconEdit } from '@consta/icons/IconEdit'
import { IconHome } from '@consta/icons/IconHome'

import RadarForm from '@/components/radars/form/RadarForm'
import { H1 } from '@/components/ui/Text'

// fix Next.js prerender with dynamic import
const Grid = dynamic(
  () => import('@consta/uikit/Grid').then((mod) => mod.Grid),
  {
    ssr: false,
  },
)

const GridItem = dynamic(
  () => import('@consta/uikit/Grid').then((mod) => mod.GridItem),
  {
    ssr: false,
  },
)

const CreateRadarPage = () => {
  return (
    <Grid gap="m">
      <GridItem>
        <Breadcrumbs
          items={[
            {
              icon: IconHome,
              label: 'Все радары',
              href: '/',
            },
            {
              icon: IconEdit,
              label: 'Новый радар',
            },
          ]}
        />
      </GridItem>

      <GridItem>
        <H1>Создание радара</H1>
      </GridItem>

      <GridItem>
        <RadarForm />
      </GridItem>

      <GridItem>
        <Link href="/">К списку радаров</Link>
      </GridItem>
    </Grid>
  )
}

export default CreateRadarPage

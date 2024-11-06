'use client'
import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'

import { Breadcrumbs } from '@consta/uikit/Breadcrumbs'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { Loader } from '@consta/uikit/Loader'
import { IconEdit } from '@consta/icons/IconEdit'
import { IconHome } from '@consta/icons/IconHome'

import RadarForm from '@/components/radars/form/RadarForm'
import RadarItems from '@/components/radars/table/RadarItems'
import ErrorInformer from '@/components/system/ErrorInformer'
import { H1 } from '@/components/ui/Text'
import { getRadar } from '@/services/radars/radarService'
import { PageParams } from '@/types/nextParams'

const RadarPage = ({ params: { id } }: PageParams<'id'>) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['radar', id],
    queryFn: () => getRadar({ id }),
  })

  if (isPending) {
    return <Loader />
  }

  if (error) {
    return <ErrorInformer error={error} />
  }

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
              label: data.name,
              href: '/',
            },
          ]}
        />
      </GridItem>
      <GridItem>
        <H1>Редактирование радара</H1>
      </GridItem>

      <GridItem>
        <RadarForm data={data} refetch={refetch} />
      </GridItem>

      {data && (
        <GridItem>
          <RadarItems data={data} refetch={refetch} />
        </GridItem>
      )}

      <GridItem>
        <Link href="/">К списку радаров</Link>
      </GridItem>
    </Grid>
  )
}

export default RadarPage

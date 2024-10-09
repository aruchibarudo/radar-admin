import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { Grid, GridItem } from '@consta/uikit/Grid'
import { Loader } from '@consta/uikit/Loader'

import RadarCard from '@/components/radars/card/RadarCard'
import ErrorInformer from '@/components/system/ErrorInformer'
import { getRadars } from '@/services/radars/radarService'

const RadarsList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['radars'],
    queryFn: () => getRadars(),
  })

  if (isPending) {
    return <Loader />
  }

  if (error) {
    return <ErrorInformer error={error} />
  }

  return (
    <Grid cols={4} gap="s">
      {data?.map((radar) => (
        <GridItem key={radar.id}>
          <RadarCard {...radar} />
        </GridItem>
      ))}
    </Grid>
  )
}

export default RadarsList

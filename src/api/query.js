import { gql, useQuery, useApolloClient } from '@apollo/client'

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN, {
    variables: { language: 'english' },
    onCompleted: () => { },
    onError: () => { }
  })
  return data.isLoggedIn ? 'Logined' : 'guest'
}


export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`

const Launches = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_LAUNCHES)
  const [isLoadingMore, setIsLoadingMore] = useState(false)


  if (loading) return 'loading...'
  if (error) return <p>ERROR</p>
  if (!data) return <p>Not found</p>

  return (
    <Fragment>
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map(launch => (
          <div key={launch.id} launch={launch} />
        ))}
      {
        data.launches &&
        data.launches.hasMore &&
        (isLoadingMore ? (
          <Loading />
        ) : (
          <Button
            onClick={async () => {
              setIsLoadingMore(true)
              await fetchMore({
                variables: {
                  after: data.launches.cursor
                }
              })

              setIsLoadingMore(false)
            }}
          >
            Load More
          </Button>
        ))
      }
    </Fragment>
  )
}

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`

export const GET_LAUNCHES = gql`
  query GetLaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`
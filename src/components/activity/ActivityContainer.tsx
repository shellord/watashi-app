import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { useGetActivities } from '@/hooks/useGetActivities'

import Activity from '@/components/activity/Activity'

const EmptyActivityFeed = () => {
  return (
    <div className='bg-primary p-5 rounded shadow'>
      <p>No activities yet 📭  </p>
      <p className='text-gray-500'>Follow users to see their activities 👀 </p>
    </div>
  )
}

const ActivityContainer = () => {
  const { data: activities, status: activitiesStatus } = useGetActivities()

  return (
    <div className='space-y-5'>
      {activitiesStatus === 'loading' && (
        <div className='flex justify-center'>
          <AiOutlineLoading3Quarters size={20} className='animate-spin' />
        </div>
      )}
      {activities?.activityFeeds.length === 0 &&
        activitiesStatus === 'success' && <EmptyActivityFeed />}
      {activities?.activityFeeds?.map((activity) => {
        return (
          <div key={activity.id}>
            <Activity
              name={activity.actor.name!}
              username={activity.actor.username!}
              userImage={activity.actor.image!}
              listName={activity.target.name}
              createdAt={activity.createdAt}
              listItems={activity.target.items}
              isActorVerified={activity.actor.isVerified}
              category={activity.target.category}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ActivityContainer

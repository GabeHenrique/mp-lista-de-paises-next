type CountryCardProps = {
  name: string,
  flag: string
}

export default function CountryCardSkeleton() {
  return (
    <div className='bg-white shadow-lg rounded-lg p-4'>
      <div className='w-full h-48 object-cover rounded-t-lg bg-gray-300'/>
      <div className='mt-4 bg-gray-200 rounded'>
        <h3 className='text-xl font-semibold text-gray-200'>skeleton</h3>
      </div>
    </div>
  )
}
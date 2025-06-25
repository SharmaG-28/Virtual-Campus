
const NSS = () => {
  return (
    <div className='p-10 flex flex-col'>
        <div className='flex flex-row items-center space-x-3 mb-10'>
            <div className='w-5 h-10 bg-[#7718A6]'></div>
            <h1 className='text-4xl font-bold text-[#7718A6]'>National Service Scheme</h1>   
        </div>
        <div className='w-full bg-white/20 rounded-lg p-10 flex flex-col space-y-5 mb-10'>
            <h2 className='text-center mb-10 font-bold text-3xl text-amber-700'>NOTICE BOARD</h2>
            <span className='flex flex-row space-x-5 text-lg'>
                <p className='bg-red-600 rounded-[40px] p-2 w-16 text-center text-yellow-400 font-bold text-[16px]'>New</p>
                <p className='p-2 font-semibold'>Enrollment for this year is open, fill the enrollment form</p>
            </span>
            <span className='flex flex-row space-x-5 text-lg'>
                <p className='bg-red-600 rounded-[40px] p-2 w-16 text-center text-yellow-400 font-bold text-[16px]'>New</p>
                <p className='p-2 font-semibold'>Notice !!!!!!!!!!!!!!!!!</p>
            </span>
            <span className='flex flex-row space-x-5 text-lg'>
                <p className='bg-red-600 rounded-[40px] p-2 w-16 text-center text-yellow-400 font-bold text-[16px]'>New</p>
                <p className='p-2 font-semibold'>Announcement !!!</p>
            </span>
            <span className='flex flex-row space-x-5 text-lg'>
                <p className='bg-red-600 rounded-[40px] p-2 w-16 text-center text-yellow-400 font-bold text-[16px]'>New</p>
                <p className='p-2 font-semibold'>Meeting Scheduled at xyz</p>
            </span>
        </div>
        <div className='bg-white flex flex-col justify-center p-8'>
            <img src="/assets/images/clubs/nss_1.png" alt="banner 1" />
        </div>
        <div className='bg-blue-900 flex flex-col justify-center p-5 mb-10'>
            <img src="/assets/images/clubs/nss_2.jpg" alt="banner 1" />
        </div>
        <h2 className='font-medium font-serif text-3xl mb-10'>National Service Scheme (NSS)</h2>

        <h3 className='font-semibold text-xl mb-3'>About National Service Scheme (NSS)</h3>
        <p className='mb-10'>The National Service Scheme (NSS) is a Central Sector Scheme of Government of India, Ministry of Youth Affairs & Sports. It provides opportunity to the student youth of 11th & 12th Class of schools at +2 Board level and student youth of Technical Institution, Graduate & Post Graduate at colleges and University level of India to take part in various Government led community service activities & programmes. The primary objective of developing the personality and character of the student youth through voluntary community service. ‘Education through Service’ is the purpose of the NSS. NSS was launched in 1969 in 37 Universities involving about 40,000 volunteers which has now spread over 657 Universities and 51 +2 Councils/Directorates, covering 20,669 Colleges/ Technical Institutions and 11,988 Senior Secondary School. Since inception , over 7.4 crore students have benefitted from NSS.</p>
        
        <h3 className='font-semibold text-xl mb-5'>The NSS Badge Proud to Serve the Nation:</h3>
        <div className='flex flex-row space-x-5 mb-10'>
            <span className='w-[20%] flex justify-center items-center'>
                <img className='h-36' src="https://nss.gov.in/sites/default/files/nss_logo.png" alt="NSS Batch" />
            </span>
            <p className='w-[80%]'>
                All the youth volunteers who opt to serve the nation through the NSS led community service wear the NSS badge with pride and a sense of responsibility towards helping needy.
                <br />
                <br />
                The Konark wheel in the NSS badge having 8 bars signifies the 24 hours of a the day, reminding the wearer to be ready for the service of the nation round the clock i.e. for 24 hours.
                <br />
                <br />
                Red colour in the badge signifies energy and spirit displayed by the NSS volunteers.
                <br />
                <br />
                The Blue colour signifies the cosmos of which the NSS is a tiny part, ready to contribute its share for the welfare of the mankind.
            </p>
        </div>

        <div className='bg-white/30 flex flex-col items-center space-y-10 p-10 rounded-lg mb-10'>
            <h3 className='font-bold text-2xl mb-5'>Motto</h3>
            <p className='text-xl text-blue-900'>"The motto of National Service Scheme is <span className='font-bold'>NOT ME BUT YOU</span>"</p>
        </div>

        <h3 className='font-semibold text-xl mb-3'>Benefits of Being a NSS Volunteer:</h3>
        <p className='mb-10'>
            A NSS volunteer who takes part in the community service programme would either be a college level or a senior secondary level student. Being an active member these student volunteers would have the exposure and experience to be the following:
            <br /> <br />
            1. An accomplished social leader <br />
            2. An efficient administrator <br />
            3. A person who understands human nature
        </p>

        <span className='px-10 text-gray-800'>
            <hr/>
        </span>

        <div className='bg-white mt-10'>
            <h3 className='font-semibold text-2xl text-center text-[#7718A6] py-5'>SIMILAR ORGANISATIONS</h3>
            <img src="/assets/images/clubs/nss_3.png" alt="banner3" />
        </div>
    </div>
  )
}

export default NSS
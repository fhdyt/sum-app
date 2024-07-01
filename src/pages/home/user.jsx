import pertama from '/src/assets/homebanner/1.jpg'
import kedua from '/src/assets/homebanner/2.jpg'
import ketiga from '/src/assets/homebanner/3.jpg'
import keempat from '/src/assets/homebanner/4.jpg'
const UserPage = () => {

    return (
        <>
            <div className='w-full  grid grid-cols-2 gap-1'>
                <img src={pertama} alt="banner" className='h-auto object-cover' />
                <img src={kedua} alt="banner" className='h-auto object-cover' />
                <img src={ketiga} alt="banner" className='h-auto object-cover' />
                <img src={keempat} alt="banner" className=' h-auto object-cover' />
            </div>
        </>
    )
}

export default UserPage
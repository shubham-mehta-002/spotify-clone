import { Card } from "../../Components"
export function PlaylistView({ cardsData})
{

    return(
        <div className='container mb-8 h-full sm:px-5'>
           
            <div className=' w-full h-full flex flex-row flex-wrap mb-4'>
            {
                cardsData.map((cardData)=><Card key={cardData._id} cardData={cardData} />)
            }            
            </div>
        </div>

    )
}
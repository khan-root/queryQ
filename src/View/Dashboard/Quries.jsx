import './dashboard.scss'
import { CiBoxList } from 'react-icons/ci'
import { BsCheck2 } from 'react-icons/bs'
import { SlGraph } from 'react-icons/sl'
import { ImUserCheck } from 'react-icons/im'





const Quries = (props) => {
  const { queriesData } = props 

  const queries = [
 
  {
    id: 2,
    count: queriesData.totalOpenQuries,
    message: 'Total Open Queries',
    icon: <BsCheck2 />
  },
  {
    id: 3,
    count: queriesData.totalClosedQuries,
    message: 'Total Closed Queries',
    icon: <SlGraph />
  },
  {
    id: 4,
    count: queriesData.totalUnasweredQuries,
    message: 'Total un-answered Queries',
    icon: <BsCheck2 />
  },
  {
    id: 5,
    count: 18,
    message: 'Total un-assigned Queries',
    icon: <ImUserCheck />
  },
]
  return (
    <div className='container-fluid mainQueries'>
        <div className='queriesContainer'>
          <span className='queriesTitle'>Queries</span>
          <div className='totalQueries'>
            <span className='queriesIcon'><CiBoxList /></span>
            <div className='queriesInfo'>
              <span className='queriesInfoNumbers'>{queriesData.totalQueries}</span>
              <span className='queriesInfoText'>Total Queries</span>
            </div>
          </div>
            <div className='subCategoryQueries'>
              {queries.map((ele)=>(
              <div className='subtotalQueries' key={ele.id}>
                <span className='subqueriesIcon'>{ele.icon}</span>
                <div className='subqueriesInfo'>
                  <span className='subqueriesInfoNumbers'>{ele.count}</span>
                  <span className='subqueriesInfoText'>{ele.message}</span>
                </div>
              </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Quries
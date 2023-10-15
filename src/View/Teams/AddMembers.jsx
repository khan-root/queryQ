import { useState } from 'react'
import { Button } from '../../Components'
import OffCanvas from '../../Components/OffCanvas/OffCanvas'
import { useTeam } from '../../ViewModel/TeamViewModal/teamServices'
import AddNewUser from './AddNewUser'
import Empleado from './Empleado'
import QueryQ from './QueryQ'


const topTabs = [
  {id: 1, tabName: 'People From Query-Q' },
  {id: 2, tabName: 'People From Empleado'},
]

const insideTabs = [
  {id: 1, tabContainerName: <QueryQ />},
  {id: 2, tabContainerName: <Empleado />},

]

const AddMembers = () => {
    


    const { memeberTab, handleTabClick,} = useTeam()
    const [addMemberCanvas, setAddMemberCanvas] = useState(false)
  return (
    <div className='members'>
        <div className='membersTop'>
            {topTabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={memeberTab === tab.id ? `heading activeHeading` : 'heading'}
                >
                    {tab.tabName}
                </button>


            ))}
        </div>
            <div className='addNewUser'>
                <Button 
                    text = 'Add New User'
                    variant='primaryBtn'
                    onClick={()=>setAddMemberCanvas(true)}
                    fontSize='13px'

                
                />
            </div>
            {insideTabs.map((tab) => (
                <div key={tab.id} className={memeberTab === tab.id ? `content activeContent` : 'content'}
                    
                >
                    {tab.tabContainerName}
                </div>
            ))}

            <OffCanvas 
                show = {addMemberCanvas}
                handleClose={() => setAddMemberCanvas(false)}
                title='Add new user'
                placement = 'end'
                style = {{width: '35vw'}}
                children = {
                    <AddNewUser 
                        close = {() => setAddMemberCanvas(false)}
                    />
                }

            />
    </div>
  )
}

export default AddMembers
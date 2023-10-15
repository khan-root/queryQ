import { AiOutlineSearch} from 'react-icons/ai'
import { FaBroadcastTower} from 'react-icons/fa'
// import Campaign from './Campaign'
// import { Offcanvas } from 'react-bootstrap'
// import NewCampaign  from './NewCampaign'
// import Campaigns from './Campaigns'
// import Button from '@/components/Button/Button'
import useBroadcast from '../../ViewModel/BraodcastViewModel/broadcastServices'
import Button from '../../Components/Button/Button'
import Campaign from './Campaign'
import Campaigns from './Campaigns'
import OffCanvas from '../../Components/OffCanvas/OffCanvas'
import NewCampaign from './NewCampaign'

const BroadcastList = () => {
    const { 
        allCampaign, campaignHandler, handleAddCampaing, handleCloseCampaign,
        toggleState, show, showSVG,campaignData, showCampaingsData, handleSearchBar, handleSearchInput
        
    } = useBroadcast()
  return (
    <>
    <div className='broadcastTemplate'>
        <div className={`row g-0`}>
            <div className={`col-lg-3`}>
                <div className='templateLeft'>
                    <div className='leftTop'>
                        <div className='topContainer'>
                            <div className='broadcast'>
                                <span className='broadcastIcon'><FaBroadcastTower /></span>
                                <span className='broadcastTitle'>Broadcast</span>
                            </div>
                            <div className='addbroadcast'>
                                <Button
                                    onClick={handleAddCampaing}
                                    text = 'New Campaign'
                                    variant='primaryBtn'
                                    padding='4px 10px'
                                    fontSize='12px'
                                />
                            </div>
                        </div>
                        <div className='broadcastSearch'>
                            <span><AiOutlineSearch /></span>
                            <input type='text' placeholder='Search' name='serachInput' onChange={(e)=>handleSearchInput(e)} onKeyDown={handleSearchBar}/>
                        </div>
                    </div>
                    <div className='leftBottom'>
                        {allCampaign.length > 0 ? (
                            allCampaign.map((ele) => {
                                if (ele.deleted === false) {
                                    return (
                                        <div
                                            key={ele._id}
                                            
                                            className={toggleState === ele._id ? `boradcastList activeBoradcastList` : 'boradcastList'}
                                        >
                                            <Campaign data={ele} 
                                                onClick={() => campaignHandler(ele)}
                                            />
                                        </div>
                                    );
                                }
                            })
                        ) : (
                            
                            <div className='emptySearchResult'>
                                <span>Data not Found</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {
                showSVG && 

                    showCampaingsData &&

                        <div className={`col-lg-9 centerBroadCastContainer`}>       
                            <Campaigns 
                                campaignData = {campaignData}
                            /> 
                        </div> 
                    
                
                    
                
            
               
             } 
        </div>
    </div>
    <OffCanvas 
        show = {show}
        handleClose = {handleCloseCampaign}
        placement = 'end'
        title = 'Add New Campaign'
        style={{width: '30vw'}}
        autoClose='true'
        children = {
            <NewCampaign 
                close = {handleCloseCampaign}
            />
        }
    />
    
    </>
  )
}

export default BroadcastList
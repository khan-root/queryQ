import teamApi from '../../Model/Data/Team/Team'

const teamViewModal = (set, get)=>({
    allTeams: [],
    allTeamUsers: [],
    team : [],
    excludedUsers: [],
    emplMembers: [],
    showUsers: false,
    toggleState: '',
    toggleIndex: '',

    getAllTeam: async(orgId)=>{
        try{
            const response = await teamApi.getAllTeams(orgId)
            const result = await response.data
            set({allTeams: result})
        }
        catch(err){
            console.log(err)
        }
    },
    teamDetailHandler : async(id, i)=>{

        set({toggleState: id})
        set({toggleIndex: i})

        const response = await teamApi.getTeamDetail(id);
        const result = await response.data;
        const teamUsers = result.members;
        set({team: result.team})
        set({allTeamUsers: teamUsers})
        set({showUsers: true})
    },

    addMemberToTeam: (newMember)=>{
        set({allTeamUsers : [...new Set([...get().allTeamUsers, newMember])]})
    },
    addMemberFromEmpToTeam: (newMember)=>{
        set({allTeamUsers : [...new Set([...get().allTeamUsers, newMember])]})
    },
    remMemberFromQueryQ: (member)=>{
        set({
            excludedUsers: get().excludedUsers.filter(excludedMember => excludedMember._id !== member._id)
        })

    },
    remMemberFromEmpleado: (member)=>{
        set({
            emplMembers: get().emplMembers.filter(emplMember => emplMember.id !== member.id)
        })

    },
    excludedMember: async(id)=>{
        const response = await teamApi.getExcludedMember(id)
        const result = await response.data;
        console.log(result)
        const teamUsers = result.user;
        set({excludedUsers: teamUsers})
    },
    getEmpMember: async()=>{
        const response = await teamApi.getEmpleadoMember()
        const result = await response.data;
        const teamUsers = result.api_response_data.EMPLOYEE_DATA;
        console.log(teamUsers)
        set({emplMembers: teamUsers})
    },
    addNewTeam: (newTeam)=>{
        set((state) => {
            const updatedTeams = [newTeam, ...state.allTeams];
            const uniqueTeams = [...new Set(updatedTeams)];
            return { allTeams: uniqueTeams };
        });
    },
    updateTeam: (updatedTeam)=>{
        set({
            allTeams: get().allTeams.map((team) => team._id === updatedTeam._id ? updatedTeam :  team)
        })
    },
    deleteTeam: (id)=>{
        set({
            allTeams: get().allTeams.filter(team => team._id !== id)
        })
    },

    addtoQueryQ:(newUser)=>{
        set({excludedUsers : [...new Set([...get().excludedUsers, newUser])]})

    },
    removeMemberFromTeam:(id)=>{
        set({allTeamUsers : get().allTeamUsers.filter((teamUser)=> teamUser._id !== id)})

    }
})


export default teamViewModal
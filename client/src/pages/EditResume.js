import React, { useEffect, useState } from 'react'
import Profile from '../components/ResumeParts/profile'
import skillsdata from '../components/ResumeParts/skills.json'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditResume = () => {

    //education states
    const [college, setCollege] = useState("");
    const [city, setCity] = useState("");
    const [course, setCourse] = useState("");
    const [startyr, setStartyr] = useState("");
    const [endyear, setEndyear] = useState("");
    const [stream, setStream] = useState("");
    const [marks, setMarks] = useState("");
    const [about, setAbout] = useState("");
    const [skills, setskill] = useState("");
    const [skillsArr,setskillArr] = useState([]);
    const [portfolio, setPortfolio] = useState("");
    const [experience, setExperience]= useState("");
    const [resume, setResume]= useState(null)
    const [suggestions, setSuggestions] = useState([]);
    const [id,setId]=useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profilResp, setProfilResp] = useState([]);
    const getprofile = async () => {

        let resp = await axios.get("https://career-jump-server.onrender.com/api/v1/profile/get-profile");
        setProfilResp(resp.data)
       
    
      }
      useEffect(() => {
        getprofile(); 
      }, [])
    useEffect(() => {  
        setCollege(profilResp.college)
        
    setCity(profilResp.city)
    setCourse(profilResp.course)
    setStartyr(profilResp.startyr)
   setEndyear(profilResp.endyear)
    setStream(profilResp.stream)
    setMarks(profilResp.marks)
    setAbout(profilResp.about)
    if(profilResp.skillsArr){
    setskillArr(profilResp.skillsArr)
    }
    setPortfolio(profilResp.portfolio)
    setExperience(profilResp.experience)
    setResume(profilResp.resume)
    setId(profilResp._id)

    }, [profilResp])
    const handleskillChange = (e) => {
        const input = e.target.value;
        setskill(input);

        if (input.length > 1) {
            const filteredSuggestions = skillsdata.skills.filter(item =>
                item.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    };

    const addskill = () => {
        if(skills!==""){
       setskillArr([...skillsArr,skills]);
       setskill("");
    }
       
    }
    // Handle suggestion click (Optional)
    const handleSuggestionClick = (suggestion) => {
        setskill(suggestion);
        setSuggestions([]); // Clear suggestions after selection
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setResume(reader.result); // Base64 string
        };
    
        if (file) {
          reader.readAsDataURL(file); // Convert file to Base64 string
        }
      };
    
      // form function
      const handleSubmit = async (e) => {
        
        try {
         if(!college || !city || !course || !startyr || !endyear || !marks || !about || !skillsArr || !portfolio || !experience || !resume){
            return toast.error("Please Provide Neccessary Fields");
         }
          dispatch(showLoading());
     
          const profileData = {
            college,
            city,
            course,
            startyr,
            endyear,
            stream,
            marks,
            about,
            skillsArr,
            portfolio,
            experience,
            resume,
            id
          };
          
          const { data } = await axios.put("https://career-jump-server.onrender.com/api/v1/profile/edit-profile", profileData);
          dispatch(hideLoading());
          if (data.success) {
            toast.success(data.message);
            
            navigate("/user/resume");
          }
        } catch (error) {
          dispatch(hideLoading());
          toast.error(error.response.data.message);
          console.log(error);
        }
      };
    return (
        <Profile>
            <div className=''>
                <div className='resumeCard'>
                    <h5 className='fw-bold'>Last/Current Educational Details</h5>

                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                            className="inputone"
                            placeholder="College/school"
                            required
                        />
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="inputtwo"
                            placeholder="City"
                            required
                        />
                    </div>
                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="inputthree"
                            placeholder="Course of Study"
                            required
                        />
                        <input
                            type="text"
                            value={stream}
                            onChange={(e) => setStream(e.target.value)}
                            className="inputthree"
                            placeholder="Stream"

                        />
                    </div>
                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            value={startyr}
                            onChange={(e) => setStartyr(e.target.value)}
                            className="inputtwo"
                            placeholder="Start Year"
                            required
                        />
                        <input
                            type="text"
                            value={endyear}
                            onChange={(e) => setEndyear(e.target.value)}
                            className="inputtwo"
                            placeholder="End Year"
                            required
                        />
                        <input
                            type="text"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            className="inputtwo"
                            placeholder="Marks (percentage/CGPA)"

                        />
                    </div>


                </div>
                <div className="resumeCard">
                    <h5 className='fw-bold'>About Section</h5>
                    <textarea
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="inputfull"
                        placeholder="Express Your Knowledge(150-600 words)"

                    />
                </div>
                <div className="resumeCard">
                    <h5 className='fw-bold'>Skills Section</h5>
                    <div className="d-flex flex-wrap">
                        <input
                            type="text"
                            value={skills}
                            onChange={handleskillChange}
                            className="inputtwo"
                            placeholder="Enter Skill"

                        />
                        <button
                            className="btn btn-outline-primary btn-sm mb-3  rounded-3 ms-2"
                            onClick={addskill}
                        >Add</button>
                    </div>
                    <div className='parentbox' >
                        {suggestions.length > 0 && (
                            <div className='suggestBox'>
                                {suggestions.map((suggestion, index) => (
                                    <p
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}

                                    >
                                        {suggestion}
                                    </p>
                                ))}
                                </div>
                            
                        )}
                    </div>
                    <div className='d-flex flex-wrap gap-2'>
                        {skillsArr?.map((skill) => (
                            <p className="mx-1 fw-normal skillfont">{skill}</p>
                        ))}

                    </div>
                </div>
                <div className="resumeCard">
                <h5 className='fw-bold'>Your Portfolio/Work Sample</h5>
                <select
               
                value={experience}
                onChange={(e)=>setExperience(e.target.value)}
                className="inputtwo me-3"
              >
                <option value="">-- Select Experience --</option>
                <option value="Fresher">Fresher</option>
                <option value="0 to 2 years">0 to 2 years</option>
                <option value="2 to 5 years">2 to 5 years</option>
                <option value="More than 5 years">More than 5 years</option>
              </select>
                <input
                    type="text"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="inputtwo"
                    placeholder="Paste Your Portfolio Link here"

                />
                <div className="mb-3">
                <label for="formFile" class="form-label">Upload your Resume File</label>
                <input type="file" accept=".pdf" className="form-control inputone" onChange={handleFileChange} />
               
          </div>
        
            </div>
            <div className='text-center my-4'>
            <button className='btn btn-sm btn-outline-dark px-4 py-1 fs-5' onClick={handleSubmit}> Update Your Profile</button>
            </div>
            </div>
        </Profile>
    )
}

export default EditResume

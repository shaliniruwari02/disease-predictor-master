document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('form').forEach(oform => {
        oform.onsubmit = function(){
            document.querySelector('#waiting').style.display='block';
            let disease=this.id.split(separator='_')[0]
            if (disease==='kidney')
            {
                fetch('/predict',{
                    method: 'POST',
                    body: JSON.stringify({
                        disease: 'kidney',
                        bp: parseInt(document.querySelector('#bp').value),
                        sg: parseInt(document.querySelector('#sg').value),
                        alb: parseInt(document.querySelector('#alb').value),
                        bs: parseInt(document.querySelector('#bsl').value),
                        rbc: parseInt(document.querySelector('#rbc').value),
                        pcc: parseInt(document.querySelector('#pcc').value),
                        pccs: parseInt(document.querySelector('#pccs').value),
                    })
                })
                .then(response=>response.json())
                .then(result=>{
                    let resultdiv=document.querySelector('#result')
                    resultdiv.innerHTML=""
                    let ans=document.createElement('h4')
                    if(result.output===1){
                        ans.innerHTML=`Alert! Your chances of having ${disease} disease are high. You may consult a doctor.`
                        ans.style.color='red'
                    }
                    else{
                        ans.innerHTML=`Your chances of having ${disease} disease are low. But you can still consult a doctor if you want to.`
                        ans.style.color='green'
                    }
                    resultdiv.append(ans)
                    document.querySelector('#waiting').style.display='none';
                    clearinput()
                })
            }
            else if(disease==='diabetes')
            {
                let gender=document.querySelector('#gender_d').value;
                let pregnancy=0;
                if(gender==='female')
                {
                    let age=document.querySelector('#age_d');
                    if(age.value>=16 && age.value<=50)
                    {
                        if(document.querySelector('#pregnancy').value==='yes')
                        {
                            pregnancy=1;
                        }
                        else{
                            pregnancy=0;
                        }
                    }
                }
                fetch('/predict',{
                    method: 'POST',
                    body:JSON.stringify({
                        disease: 'diabetes',
                        pregnancy: pregnancy,
                        glucose: document.querySelector('#glucose').value,
                        bp: document.querySelector('#bp_d').value,
                        bmi: document.querySelector('#bmi').value,
                        dp_fx: document.querySelector('#d_pedigree_fxn').value,
                        age: document.querySelector('#age_d').value
                    })
                })
                .then(response=>response.json())
                .then(result=>{
                    let resultdiv=document.querySelector('#result')
                    resultdiv.innerHTML=""
                    let ans=document.createElement('h4')
                    if(result.output===1){
                        ans.innerHTML=`Alert! Your chances of having ${disease} disease are high. You may consult a doctor.`
                        ans.style.color='red'
                    }
                    else{
                        ans.innerHTML=`Your chances of having ${disease} disease are low. But you can still consult a doctor if you want to.`
                        ans.style.color='green'
                    }
                    resultdiv.append(ans)
                    document.querySelector('#waiting').style.display='none';
                    // clearinput()
                })
            };
            return false
        }
    })
    document.querySelector('#kidney_data').style.display='none';
    document.querySelector('#breast_cancer_data').style.display='none';
    document.querySelector('#heart_data').style.display='none';
    document.querySelector('#liver_data').style.display='none';
    document.querySelector('#diabetes_data').style.display='none';
    document.querySelector('#waiting').style.display='none';
    
    document.querySelector('#disease_slctr').onchange = function() {
        let disease=this.value
        document.querySelector('#kidney_data').style.display='none';
        document.querySelector('#breast_cancer_data').style.display='none';
        document.querySelector('#heart_data').style.display='none';
        document.querySelector('#liver_data').style.display='none';
        document.querySelector('#diabetes_data').style.display='none';
        if(disease!=='')
        {
            document.querySelector(`#${disease}_data`).style.display='block';
            if(disease==='diabetes')
            {
                document.querySelector('#pregnancy_div').style.display='none';
                let age=document.querySelector('#age_d')
                document.querySelector('#age_d').onkeyup = () =>{
                    if(age.value>=16 && age.value<=50 && document.querySelector('#gender_d').value=='female')
                    {
                        document.querySelector('#pregnancy_div').style.display='block';
                    }
                    else{
                        document.querySelector('#pregnancy_div').style.display='none';
                    }
                }
                document.querySelector('#gender_d').onchange = function(){
                    if(age.value>=16 && age.value<=50 && this.value=='female')
                    {
                        document.querySelector('#pregnancy_div').style.display='block';
                    }
                    else{
                        document.querySelector('#pregnancy_div').style.display='none';
                    }
                }
            }
        }
    }
})
function clearinput()
{
    document.querySelectorAll('input').forEach(input=>{
        if(input.className!=='submitbtn'){
            input.value=''
        }
    })
}
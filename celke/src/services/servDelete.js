export const servDelete = async (url) => {
    var mensage;


    await axios.delete(url)
    .then((response) =>{
        mensage = response.data.mensage;
    }).catch((err) => {
        if(err.response){
            mensage = err.response.data.mensagem
          }else{
            mensage ="Erro"
          }
    })

    return mensage;
}
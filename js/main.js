const BASE_URL = 'http://api.countrylayer.com/v2/',
    API_KEY = '431876f22c77b8666eeefe516a12cf16',
    FLAG_BASE_URL = 'https://api.backendless.com/2F26DFBF-433C-51CC-FF56-830CEA93BF00/473FB5A9-D20E-8D3E-FF01-E93D9D780A00/files/CountryFlagsPng/';

const selectEndPoint = selectElement('#end-point');
selectElement('#query-input').addEventListener('input', (event) => {
    if(!event.target.value){
        selectElement('#content').innerHTML = '';
    }
    load(event.target.value[0].toUpperCase() + event.target.value.substring(1));
})
selectElement('#query-input').addEventListener('keydown', (event) => {
    if(event.keyCode == 13){
        if(!event.target.value){
            selectElement('#content').innerHTML = '';
        }
        load(event.target.value[0].toUpperCase() + event.target.value.substring(1));
    }
})

let endPointOptions = Array.from(selectEndPoint.options);
let endPoint = endPointOptions[selectEndPoint.selectedIndex].value;
endPointOptions.forEach(elem => {
    elem.addEventListener('click', event => {
        endPoint = event.target.value;
    })
})

function selectElement(elem, arr = false){
    if(arr){
        return document.querySelectorAll(elem);
    }
    return document.querySelector(elem);
}

function load(query){
    const XHR = new XMLHttpRequest();
    console.log(query);
    XHR.onreadystatechange = handler;
    XHR.open('GET', `${BASE_URL}${endPoint}/${query}?access_key=${API_KEY}`)
    XHR.send();

    function handler(){
        if(this.readyState === this.DONE){
            if(this.status === 200){
                // remove loading banner
                selectElement('#loading').style.display = 'none';

                // remove error banner
                selectElement('#error').style.display = 'none';

                let data = JSON.parse(XHR.response);
                selectElement('#content').innerHTML = '';
                [].forEach.call(data, country => {
                    let div = document.createElement('div');
                    div.innerHTML = `<div class="mt-3 text-dark bg-light rounded text-start">
                    <div class="card mb-0">
                        <div class="row g-0 h-100">
                          <div class="col-md-4">
                            <img src="${FLAG_BASE_URL + country.alpha3Code.toLowerCase()}.png" id="flag" class="img-fluid rounded-start h-100" alt="...">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title display-4" id="name">
                                ${country.name}
                                <small class="text-muted">
                                    <span class="badge badge-pill" id="alpha2code">
                                        ${country.alpha2Code}
                                    </span>
                                </small>  
                              </h5>
                              <h3 class="card-subtitle mb-2 text-muted" id="capital">
                                ${country.capital}
                              </h3>
                              <p class="card-text" id="details">
                                  <table class="table">
                                      <tr>
                                          <th>Calling Code</th>
                                          <td id="calling-code">
                                            ${country.callingCodes[0]}
                                          </td>
                                      </tr>
                                    <tr>
                                        <th>Region</th>
                                        <td id="region">
                                            ${country.region}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Top Level Domain</th>
                                        <td id="domain">
                                            ${country.topLevelDomain}
                                        </td>
                                    </tr>
                                  </table>
                              </p>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>`;
                
                selectElement('#content').appendChild(div);
                });
            }
            else{
                // remove loading banner
                selectElement('#loading').style.display = 'none';

                selectElement('#error').style.display = 'block';
            }
            }
        else{
            // remove error banner
            selectElement('#error').style.display = 'none';
            
            selectElement('#loading').style.display = 'block';
        }
        }
}

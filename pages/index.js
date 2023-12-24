import Image from 'next/image';
import Seo from '../components/Seo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export default function Index({users}) {
  const [cookie, setCookie] = useState();
  const [typeOfPassInp, setTypeOfPassInp] = useState('password');
  const [logedIn, setLogedIn] = useState();
  const [isError, setIsError] = useState(false);
  const [choosenOption, setChoosenOption] = useState("Собственник");
  const [sobstveniksSelected, setSobstvenikSelected] = useState([]);
  const [vagonTypeSelected, setVagonTypeSelected] = useState([]);
  const [godnostSelected, setGodnostSelected] = useState([]);
  const [prostoiSelected, setProstoiSelected] = useState([]);
  const [dneiDoRemontaSelected, setDneiDoRemontaSelected] = useState([]);
  const [filterSearch, setFilterSearch] = useState(false);
  const [filterOpened, setFilterOpened] = useState(false);
  const [RightB, SetRightB] = useState(false);
  const Stations = ['bimbi', 'bmbu', 'bmbubm'];
  const [sobstveniksApplied, setSobstvenikApplied] = useState([]);
  const [vagonTypeApplied, setVagonTypeApplied] = useState([]);
  const [godnostApplied, setGodnostApplied] = useState([]);
  const [prostoiApplied, setProstoiApplied] = useState([]);
  const [dneiDoRemontaApplied, setDneiDoRemontaApplied] = useState([]);

  useEffect(() => {
    const cookie = new Cookies();
    setCookie(cookie);
    setLogedIn(cookie.get('logedIn', false));
    window.addEventListener("contextmenu", function(e) { e.preventDefault(); })
  }, [])

  const doSomething = function (e) {
    if (Object.entries(users).filter(user => (user[1].station == e.target[0].value) && (user[1].login == e.target[1].value) && (user[1].pass == e.target[2].value)).length == 1)
    {
      setLogedIn(true);
      cookie.set('logedIn', true);
    }
    else
    {
      setIsError(true);
    }
    e.preventDefault();
}

  return (
    <div className="App" id="app">
        <Seo title="ЕВРАЗ" description="ЕВРАЗ" keywords="ЕВРАЗ"/>

        {logedIn ? <div></div>
        :
        <div className='main'>
        <form action="#" onSubmit={doSomething} id='form'>
          <div className='logo'>
            <img src="/logo.svg"/>
            <div className='title'>
              <img src="/slash.svg"/>
              <p>АРМ диспетчера ЖД станции</p>
              <img src="/right.svg"/>
            </div>
          </div>
          <div className='auth'>Авторизация</div>
          <div className='sep'></div>
          <div className='inputs'>
            <div className='input'>
              <p className='inputP'>Станция</p>
              <select>
                <option value='NK'>Новокузнецк-Северный</option>
                <option value='T'>Томусинская</option>
                <option value='K'>Курегеш</option>
              </select>
            </div>
            <div className='input'>
              <p className='inputP'>Логин<span style={{color: '#BB2532'}}>*</span></p>
              <input className={isError ? "redInput inputMain" : "grayInput inputMain"} required/>
            </div>
            <div className='input'>
              <p className='inputP'>Пароль<span style={{color: '#BB2532'}}>*</span></p>
              <input type={typeOfPassInp} className={isError ? "redInput inputMain" : "grayInput inputMain"} required/>
              <img className='glaz' width={24} src="/glaz.svg" onClick={() => {typeOfPassInp == 'password' ? setTypeOfPassInp('text') : setTypeOfPassInp('password')}}/>
            </div>
          </div>
          <div className='sep'></div>
          <button className='submit' type='submit'>Войти</button>
        </form>
      </div>
      }
      {logedIn ? filterOpened ?
      <div className="modalHolder">
        <div className='modalFlex'>
          <div className='modalCont'>
            <div className="modalMainCont">
              <div className="modalHeader">
                <p className="modalHeaderText">Пользовательский фильтр</p>
                <div className="sepModal"/>
              </div>
              <div className="modalMain">
                <div className="modalChooseOption">
                  <div className={choosenOption == "Собственник" ? "choosenOption" : "option"} onClick={() => {choosenOption != "Собственник" ? setChoosenOption("Собственник") : null}}>Собственник</div>
                  <div className={choosenOption == "Тип вагона" ? "choosenOption" : "option"} onClick={() => {choosenOption != "Тип вагона" ? setChoosenOption("Тип вагона") : null}}>Тип вагона</div>
                  <div className={choosenOption == "Годность" ? "choosenOption" : "option"} onClick={() => {choosenOption != "Годность" ? setChoosenOption("Годность") : null}}>Годность</div>
                  <div className={choosenOption == "Простой" ? "choosenOption" : "option"} onClick={() => {choosenOption != "Простой" ? setChoosenOption("Простой") : null}}>Простой</div>
                  <div className={choosenOption == "Дней до ремонта" ? "choosenOption" : "option"} onClick={() => {choosenOption != "Дней до ремонта" ? setChoosenOption("Дней до ремонта") : null}}>Дней до ремонта</div>
                  {/* {sobstveniksSelected.length != 0 || vagonTypeSelected != 0 || godnostSelected != 0 || prostoiSelected != 0 || dneiDoRemontaSelected != 0 ? <div className={choosenOption == "Избранное" ? "choosenOption" : "option"} onClick={() => {choosenOption != "Избранное" ? setChoosenOption("Избранное") : null}}>Избранное</div> : null} */}
                </div>
                <div className="modalOptions">
                  <div className="inputModalOptions">
                    <div className="modalCheckboxCont">
                      <input type="checkbox" className='modalCheckbox' onChange={(e) => {setFilterSearch(e.target.checked)}}/>
                    </div>
                    <div className="modalOptionsSubCont">
                      <img src="/search.svg" className="modalSearchIcon" width={18} height={18}/>
                      <input type="text" className='modalSearchInput' placeholder='Поиск по фильтру...'/>
                    </div>
                  </div>
                  {choosenOption == "Собственник" ?
                  <div className="modalOptionsList">
                    <div className="modalOption">
                      <input type="checkbox" checked={sobstveniksSelected.includes("НТС")} className='modalOptionCheckbox' id='2' onChange={(e) => {e.target.checked ? setSobstvenikSelected(sobstveniksSelected.concat(["НТС"])) : setSobstvenikSelected(sobstveniksSelected.filter(e => e != "НТС"))}}/>
                      <div className="modalOptionText">АО НефтеТрансСервис (НТС)</div>
                    </div>
                    <div className="modalOption">
                      <input type="checkbox" checked={sobstveniksSelected.includes("ГК")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setSobstvenikSelected(sobstveniksSelected.concat(["ГК"])) : setSobstvenikSelected(sobstveniksSelected.filter(e => e != "ГК"))}}/>
                      <div className="modalOptionText">ООО Грузовая компания (ГК)</div>
                    </div>
                    <div className="modalOption">
                      <input type="checkbox" checked={sobstveniksSelected.includes("АТЛ")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setSobstvenikSelected(sobstveniksSelected.concat(["АТЛ"])) : setSobstvenikSelected(sobstveniksSelected.filter(e => e != "АТЛ"))}}/>
                      <div className="modalOptionText">ООО Атлант (АТЛ)</div>
                    </div>
                    <div className="modalOption">
                      <input type="checkbox" checked={sobstveniksSelected.includes("ПГК")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setSobstvenikSelected(sobstveniksSelected.concat(["ПГК"])) : setSobstvenikSelected(sobstveniksSelected.filter(e => e != "ПГК"))}}/>
                      <div className="modalOptionText">ОАО Первая грузовая компания (ПГК)</div>
                    </div>
                    <div className="modalOption">
                      <input type="checkbox" checked={sobstveniksSelected.includes("МОД")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setSobstvenikSelected(sobstveniksSelected.concat(["МОД"])) : setSobstvenikSelected(sobstveniksSelected.filter(e => e != "МОД"))}}/>
                      <div className="modalOptionText">ООО Модум-Транс (МОД)</div>
                    </div>
                    <div className="modalOption">
                      <input type="checkbox" checked={sobstveniksSelected.includes("РЖД")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setSobstvenikSelected(sobstveniksSelected.concat(["РЖД"])) : setSobstvenikSelected(sobstveniksSelected.filter(e => e != "РЖД"))}}/>
                      <div className="modalOptionText">ОАО РЖД (РЖД)</div>
                    </div>
                    <div className="modalOption">
                      <input type="checkbox" checked={sobstveniksSelected.includes("НПК")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setSobstvenikSelected(sobstveniksSelected.concat(["НПК"])) : setSobstvenikSelected(sobstveniksSelected.filter(e => e != "НПК"))}}/>
                      <div className="modalOptionText">АО Новая перевозочная компания (НПК)</div>
                    </div>
                    <div className="modalOption">
                      <input type="checkbox" checked={sobstveniksSelected.includes("ФГК")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setSobstvenikSelected(sobstveniksSelected.concat(["ФГК"])) : setSobstvenikSelected(sobstveniksSelected.filter(e => e != "ФГК"))}}/>
                      <div className="modalOptionText">АО Федеральная грузовая компания (ФГК)</div>
                    </div>
                    <div className="modalOption">
                      <input type="checkbox" checked={sobstveniksSelected.includes("МЕЧ")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setSobstvenikSelected(sobstveniksSelected.concat(["МЕЧ"])) : setSobstvenikSelected(sobstveniksSelected.filter(e => e != "МЕЧ"))}}/>
                      <div className="modalOptionText">ООО Мечел-Транс (МЕЧ)</div>
                    </div>
                    <div className="modalOption">
                      <input type="checkbox" checked={sobstveniksSelected.includes("Прочее")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setSobstvenikSelected(sobstveniksSelected.concat(["Прочее"])) : setSobstvenikSelected(sobstveniksSelected.filter(e => e != "Прочее"))}}/>
                      <div className="modalOptionText">Прочее</div>
                    </div>
                  </div> : choosenOption == "Тип вагона" ?
                  <div className="modalOptionsList">
                  <div className="modalOption">
                    <input type="checkbox" checked={vagonTypeSelected.includes("Инновационный")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setVagonTypeSelected(vagonTypeSelected.concat(["Инновационный"])) : setVagonTypeSelected(vagonTypeSelected.filter(e => e != "Инновационный"))}}/>
                    <div className="modalOptionText">Инновационный</div>
                  </div>
                  <div className="modalOption">
                    <input type="checkbox" checked={vagonTypeSelected.includes("Люковый")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setVagonTypeSelected(vagonTypeSelected.concat(["Люковый"])) : setVagonTypeSelected(vagonTypeSelected.filter(e => e != "Люковый"))}}/>
                    <div className="modalOptionText">Люковый</div>
                  </div>
                  <div className="modalOption">
                    <input type="checkbox" checked={vagonTypeSelected.includes("Безлюковый")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setVagonTypeSelected(vagonTypeSelected.concat(["Безлюковый"])) : setVagonTypeSelected(vagonTypeSelected.filter(e => e != "Безлюковый"))}}/>
                    <div className="modalOptionText">Безлюковый</div>
                  </div>
                </div> : choosenOption == "Годность" ?
                  <div className="modalOptionsList">
                  <div className="modalOption">
                    <input type="checkbox" checked={godnostSelected.includes("Экспорт")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setGodnostSelected(godnostSelected.concat(["Эксперт"])) : setGodnostSelected(godnostSelected.filter(e => e != "Эксперт"))}}/>
                    <div className="modalOptionText">Экспорт</div>
                  </div>
                  <div className="modalOption">
                    <input type="checkbox" checked={godnostSelected.includes("РФ")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setGodnostSelected(godnostSelected.concat(["РФ"])) : setGodnostSelected(godnostSelected.filter(e => e != "РФ"))}}/>
                    <div className="modalOptionText">РФ</div>
                  </div>
                  <div className="modalOption">
                    <input type="checkbox" checked={godnostSelected.includes("ЗапСиб")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setGodnostSelected(godnostSelected.concat(["ЗапСиб"])) : setGodnostSelected(godnostSelected.filter(e => e != "ЗапСиб"))}}/>
                    <div className="modalOptionText">ЗапСиб</div>
                  </div>
                  <div className="modalOption">
                    <input type="checkbox" checked={godnostSelected.includes("Больной")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setGodnostSelected(godnostSelected.concat(["Больной"])) : setGodnostSelected(godnostSelected.filter(e => e != "Больной"))}}/>
                    <div className="modalOptionText">Больной</div>
                  </div>
                  <div className="modalOption">
                    <input type="checkbox" checked={godnostSelected.includes("Кроме КЗ")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setGodnostSelected(godnostSelected.concat(["Кроме КЗ"])) : setGodnostSelected(godnostSelected.filter(e => e != "Кроме КЗ"))}}/>
                    <div className="modalOptionText">Кроме КЗ</div>
                  </div>
                </div> : choosenOption == "Простой" ?
                <div className="modalOptionsList">
                <div className="modalOption">
                  <input type="checkbox" checked={prostoiSelected.includes("1-3 суток")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setProstoiSelected(prostoiSelected.concat(["1-3 суток"])) : setProstoiSelected(prostoiSelected.filter(e => e != "1-3 суток"))}}/>
                  <div className="modalOptionText">1-3 суток</div>
                </div>
                <div className="modalOption">
                  <input type="checkbox" checked={prostoiSelected.includes("4-5 суток")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setProstoiSelected(prostoiSelected.concat(["4-5 суток"])) : setProstoiSelected(prostoiSelected.filter(e => e != "4-5 суток"))}}/>
                  <div className="modalOptionText">4-5 суток</div>
                </div>
                <div className="modalOption">
                  <input type="checkbox" checked={prostoiSelected.includes("6-10 суток")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setProstoiSelected(prostoiSelected.concat(["6-10 суток"])) : setProstoiSelected(prostoiSelected.filter(e => e != "6-10 суток"))}}/>
                  <div className="modalOptionText">6-10 суток</div>
                </div>
                <div className="modalOption">
                  <input type="checkbox" checked={prostoiSelected.includes("Более 10 суток")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setProstoiSelected(prostoiSelected.concat(["Более 10 суток"])) : setProstoiSelected(prostoiSelected.filter(e => e != "Более 10 суток"))}}/>
                  <div className="modalOptionText">Более 10 суток</div>
                </div>
              </div> : choosenOption == "Дней до ремонта" ?
                <div className="modalOptionsList">
                <div className="modalOption">
                  <input type="checkbox" checked={dneiDoRemontaSelected.includes("1-200 суток")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setDneiDoRemontaSelected(dneiDoRemontaSelected.concat(["1-200 суток"])) : setDneiDoRemontaSelected(dneiDoRemontaSelected.filter(e => e != "1-200 суток"))}}/>
                  <div className="modalOptionText">1-200 суток</div>
                </div>
                <div className="modalOption">
                  <input type="checkbox" checked={dneiDoRemontaSelected.includes("200-400 суток")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setDneiDoRemontaSelected(dneiDoRemontaSelected.concat(["200-400 суток"])) : setDneiDoRemontaSelected(dneiDoRemontaSelected.filter(e => e != "200-400 суток"))}}/>
                  <div className="modalOptionText">200-400 суток</div>
                </div>
                <div className="modalOption">
                  <input type="checkbox" checked={dneiDoRemontaSelected.includes("400-600 суток")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setDneiDoRemontaSelected(dneiDoRemontaSelected.concat(["400-600 суток"])) : setDneiDoRemontaSelected(dneiDoRemontaSelected.filter(e => e != "400-600 суток"))}}/>
                  <div className="modalOptionText">400-600 суток</div>
                </div>
                <div className="modalOption">
                  <input type="checkbox" checked={dneiDoRemontaSelected.includes("600-800 суток")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setDneiDoRemontaSelected(dneiDoRemontaSelected.concat(["600-800 суток"])) : setDneiDoRemontaSelected(dneiDoRemontaSelected.filter(e => e != "600-800 суток"))}}/>
                  <div className="modalOptionText">600-800 суток</div>
                </div>
                <div className="modalOption">
                  <input type="checkbox" checked={dneiDoRemontaSelected.includes("800-1000 суток")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setDneiDoRemontaSelected(dneiDoRemontaSelected.concat(["800-1000 суток"])) : setDneiDoRemontaSelected(dneiDoRemontaSelected.filter(e => e != "800-1000 суток"))}}/>
                  <div className="modalOptionText">800-1000 суток</div>
                </div>
                <div className="modalOption">
                  <input type="checkbox" checked={dneiDoRemontaSelected.includes("Более 1000 суток")} className='modalOptionCheckbox' onChange={(e) => {e.target.checked ? setDneiDoRemontaSelected(dneiDoRemontaSelected.concat(["Более 1000 суток"])) : setDneiDoRemontaSelected(dneiDoRemontaSelected.filter(e => e != "Более 1000 суток"))}}/>
                  <div className="modalOptionText">Более 1000 суток</div>
                </div>
              </div> : null
                }
                </div>
                <div className="modalChoosenOptions">
                  <div className="modalChoosenOptionsCont">
                    <div className="modalChoosenOptionsList">
                      <div className="modalChosenOption">
                      </div>
                      {sobstveniksSelected.length != 0 ? <div className="modalChosenOption">
                        Собственник:
                      </div> : null}
                      {sobstveniksSelected.length != 0 ? sobstveniksSelected.map((name) => (
                        <div className="modalChosenOption gray">
                        {name}
                      </div>
                      )) : null}
                      {vagonTypeSelected.length != 0 ? <div className="modalChosenOption">
                        Тип вагона:
                      </div> : null}
                      {vagonTypeSelected.length != 0 ? vagonTypeSelected.map((name) => (
                        <div className="modalChosenOption gray">
                        {name}
                      </div>
                      )) : null}
                      {godnostSelected.length != 0 ? <div className="modalChosenOption">
                        Годность:
                      </div> : null}
                      {godnostSelected.length != 0 ? godnostSelected.map((name) => (
                        <div className="modalChosenOption gray">
                        {name}
                      </div>
                      )) : null}
                      {prostoiSelected.length != 0 ? <div className="modalChosenOption">
                        Простой:
                      </div> : null}
                      {prostoiSelected.length != 0 ? prostoiSelected.map((name) => (
                        <div className="modalChosenOption gray">
                        {name}
                      </div>
                      )) : null}
                      {dneiDoRemontaSelected.length != 0 ? <div className="modalChosenOption">
                        Дней до ремонта:
                      </div> : null}
                      {dneiDoRemontaSelected.length != 0 ? dneiDoRemontaSelected.map((name) => (
                        <div className="modalChosenOption gray">
                        {name}
                      </div>
                      )) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="sepModal"/>
              <div className="buttonsModal">
                <div className="buttonModalText" onClick={() => setFilterOpened(false)}>
                  Закрыть
                </div>
                <div className="buttonModal" onClick={() => {setSobstvenikApplied(sobstveniksSelected);setVagonTypeApplied(vagonTypeSelected);setGodnostApplied(godnostSelected);setProstoiApplied(prostoiSelected);setDneiDoRemontaApplied(dneiDoRemontaSelected);setFilterOpened(false)}}>
                  Применить
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> : null  : null}
      {logedIn ? <div>
      {RightB?
        <div className='RightB' onClick={()=>SetRightB(false)}>
          <p onClick={e=>e.stopPropagation()} style={{top: RightB[2], left: RightB[1]}}>
            {RightB[0]}
          </p>
        </div>
        :<></>}
        <div className='basic'>
          <div className='first-line'>
            <img src='/rgd.svg'/>
            <p>АРМ дежурного по станции</p>
            <p>Журнал операций</p>
          </div>
          <div className="second-line">

            <div className="second-l">
              <select>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
              </select>
              <div className='stations'>
                {Stations.map((e)=>
                <div className='slotOfSecondL'>{e}
                <img src='/x.svg' width={19}/>
                </div>)}
              </div>
            </div>

            <div className="second-r">
              <select>
                  <option value='Собственник'>Собственник</option>
                  <option value='Собственник'>Собственник</option>
                  <option value='Собственник'>Собственник</option>
                  <option value='Собственник'>Собственник</option>
              </select>
              <div className="sep-v"></div>
              <span className='filter' onClick={() => {setFilterOpened(true)}}>
                <img src="/filter.svg" alt="" width={24}/>
                <div>{sobstveniksApplied.length + vagonTypeApplied.length + godnostApplied.length + prostoiApplied.length + dneiDoRemontaApplied.length}</div>
              </span>
              <span className='vagon'>
                <img src="/vagon.svg"  alt="" width={26}/>
                <div>(3)</div>
              </span>
            </div>
              
          </div>

          <div className='panel'>
            <p style={{fontFamily: 'GT'}}>АРМ дежурного по станции</p>
            <div className='third-line'>
                  <div className='third-l'>
                    <div>
                      <input id='FreeWay' onChange={e=>console.log(e.target.value)} type="checkbox"/>
                      <label htmlFor="FreeWay">Скрыть свободные пути</label>
                    </div>
                    <div>
                      <input id='Number' type="checkbox"/>
                      <label htmlFor="Number">Номер вагона</label>
                    </div>
                  </div>
                  <div className="third-r">
                    <p>Операции на станции</p>
                    <div>2</div>
                    <img src="/train.svg" width={25.1} alt="" />
                    <img src="/excel.svg" width={20} alt="" />
                  </div>
              </div>

              <div className='fourth-line'>
                <span>Собственники:</span>
                <div className='item-fl'>
                  <div className='quadro' style={{backgroundColor: '#BCF3FF'}}></div>
                  <p>НТС(10)</p>
                </div>
                <div className='item-fl'>
                  <div className='quadro' style={{backgroundColor: '#BCF3FF'}}></div>
                  <p>НТС(10)</p>
                </div>
                <div className='item-fl'>
                  <div className='quadro' style={{backgroundColor: '#BCF3FF'}}></div>
                  <p>НТС(10)</p>
                </div>
                <div className='item-fl'>
                  <div className='quadro' style={{backgroundColor: '#BCF3FF'}}></div>
                  <p>НТС(10)</p>
                </div>
                <div className='item-fl'>
                  <div className='quadro' style={{backgroundColor: '#BCF3FF'}}></div>
                  <p>НТС(10)</p>
                </div>
                
              </div>

              <div className='fifth-line'>
                <input placeholder='поиск по вагону' />
                <div><div className='quadro' style={{backgroundColor: 'orange'}}></div>Больные (3)</div>
                <div><img src="/shasi.svg" width={55}/> Простой более 5 суток (34)</div>
                <div><img src="/gruzhenyeIsh.svg" width={14} /> Груженые исходящие (10)</div>
                <div><img src="/square.svg" width={14} alt="" /> Порожние (50)</div>
              </div>

              <div className='title-table'>Парк "П"</div>
              <table>

                <thead>
                  <tr>
                    <th>Путь</th>
                    <th>Всего</th>
                    <th>Л</th>
                    <th><div>(Чётная)</div><div>(Нечётная)</div></th>
                    <th>Л</th>
                  </tr>
                </thead>

                <tbody>

                  {[{Way:1, n: 12, L:[1234,'/trainL.svg']}, 
                {Way:2, n: 12, L:[1234,'/trainL.svg']},
                {Way:3, n: 12, L:[1234,'/trainL.svg']},
                {Way:4, n: 12, L:[1234,'/trainL.svg']},
                {Way:5, n: 12, L:[1234,'/trainL.svg']},
                {Way:6, n: 12, L:[1234,'/trainL.svg']}].map(e=>
                <tr>
                  <td>{e.Way}</td>
                  <td>{e.n}</td>
                  <td className='loco'><div>{e.L[0]}</div><img src={e.L[1]}/></td>

                  <td className='trains'>
                  {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(e=>
                  <div>
                    <img src="/trains/default/GruzhonyiNaPodye.svg" alt="" onContextMenu={(e)=>SetRightB(['данные о вагоне',e.clientX, e.clientY])}/>
                  </div>)}
                  </td>

                  <td className='loco'><div>{e.L[0]}</div><img src={e.L[1]} width={33}/></td>
                </tr>)}

                </tbody>
              </table>
          </div>
        </div></div>
      : null}
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`https://db-lovat.vercel.app/getUsers.php`);
  const users = await response.json();
  return {
      props: {users},
  };
}
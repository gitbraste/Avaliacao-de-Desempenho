import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import api from "../../services/api";
import style from "./styles.module.scss";
import ReactModal from 'react-modal';

export function ConsultHR({ manager, onSetManager }) {
    const [resultValue, setResultValue] = useState(0);
    const [register, setRegister] = useState("");
    const [assessment, setAssessment] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [selectEmployee, setSelectEmployee] = useState("");

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectAssessment, setSelectAssessment] = useState([]);

    const [isValid, setIsvalid] = useState(true);
    const [isCodeValid, setCodeIsvalid] = useState(true);
    const [isFilterValid, setIsFilterValid] = useState(true);
    const [errorMensage, setErrorMensage] = useState("");

    const [showDetails, setShowDetails] = useState(false);
    const [showCodeField, setShowCodeField] = useState(false);
    const [showManagerField, setShowManagerField] = useState(true);
    const [showAssessment, setShowAssessment] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const [validCode, setValidCode] = useState(null);
    const [inputCode, setInputCode] = useState(null);

    useEffect(() => {
        onSetManager(() => [])
    }, []);

    useEffect(() => {
        let result = 0;
        let indice = 0;
        selectAssessment.forEach(element => {
            result += element.value;
            indice++;
        });
        setResultValue((result / indice).toFixed(2))
    }, [selectAssessment])

    const handleValidationCode = (e) => {
        e.preventDefault();
        if (/* validCode */'123' === inputCode) {
            setShowCodeField(false);
            setShowAssessment(true);
        } else {
            setCodeIsvalid(false);
        }
    }

    const setModalIsOpenToTrue = (id) => {
        setModalIsOpen(true);

        api.get(`/assessment/${id}`)
            .then((response) => {
                setSelectAssessment(response.data)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false);
        setShowDetails(false);
    }

    const getAssessment = (data) => {
        setAssessment(() => []);

        const code = Math.random().toString().slice(2, 8);
        setValidCode(code);

        const sendEmail = {
            email: /* manager[0].email */"joao.soares@brasterapica.com.br",
            code: code
        };

        api.get(`/assessment/manager/${data[0].register}`)
            .then((response) => {
                setAssessment(response.data)
                /* api.post(`/email`, sendEmail)
                    .then(() => {
                    }).catch((error) => {
                        console.log(error);
                    }) */
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const getManager = () => {
        onSetManager([]);
        api.get(`/user/${register}`)
            .then((response) => {
                if (response.data.length === 0) {
                    setIsvalid(false);
                } else {
                    setShowManagerField(false);
                    setShowCodeField(true);
                    onSetManager(response.data)
                    getAssessment(response.data)
                    setIsvalid(true);
                    getEmployes(response.data)
                }
            }).catch((error) => {
                setIsvalid(false);
            })
    }

    const getEmployes = (data) => {
        api.get(`/user/manager/${data[0].register}`)
            .then((response) => {
                setEmployees(response.data)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const handleRegister = (e) => {
        e.preventDefault();

        getManager();
    }

    const handleFilter =()=>{
        setIsFilterValid(true);

        if(selectEmployee && !dateStart && !dateEnd){
            api.get(`/assessment/user/${selectEmployee}/${manager[0].register}`)
            .then((response) => {
                setAssessment(response.data)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });

            setShowFilter(false);
        }else if(!selectEmployee && !dateStart && !dateEnd){
            api.get(`/assessment/manager/${manager[0].register}`)
            .then((response) => {
                setAssessment(response.data)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });

            setShowFilter(false);
        }else if(!selectEmployee && dateStart && dateEnd){
            api.get(`/assessment/date/${manager[0].register}/${dateStart}/${dateEnd}`)
            .then((response) => {
                setAssessment(response.data)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });

            setShowFilter(false);
        }else if(selectEmployee && dateStart && dateEnd){
            api.get(`/assessment/date/${selectEmployee}/${manager[0].register}/${dateStart}/${dateEnd}`)
            .then((response) => {
                setAssessment(response.data)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });

            setShowFilter(false);
        }else if(dateStart && !dateEnd){
            setIsFilterValid(false);
            setErrorMensage("data final");
        }else if(!dateStart && dateEnd){
            setIsFilterValid(false);
            setErrorMensage("data inicial");
        }
        setSelectEmployee("");
    }

    return (
        <div className={style.container}>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={setModalIsOpenToFalse}
                ariaHideApp={false}
            >
                {selectAssessment.length !== 0 &&
                    <section className={style.modalContent}>
                        <section className={style.closeButton}>
                            <button onClick={() => setModalIsOpenToFalse()}>x</button>
                        </section>
                        <section className={style.modalUserContent}>
                            <p>Nome: {selectAssessment[0].name}</p>
                            <p>cargo: {selectAssessment[0].position}</p>
                            <p>Data: {new Intl.DateTimeFormat('pt-BR').format(new Date(selectAssessment[0].date_time))}</p>
                        </section>
                        <section className={style.resultContent}>
                            <h2>Síntese dos Resultados</h2>
                            <p>Pontuação Total:</p>
                            {(resultValue > 3 && resultValue <= 4) && <p className={style.resultLabel}>Acima do Esperado</p>}
                            {(resultValue > 2 && resultValue <= 3) && <p className={style.resultLabel}>Atinge o Esperado</p>}
                            {(resultValue > 1.5 && resultValue <= 2) && <p className={style.resultLabel}>Atinge Parcialmente o esperado</p>}
                            {(resultValue <= 1.5) && <p className={style.resultLabel}>Abaixo do Esperado</p>}
                            {showDetails ? <button onClick={() => setShowDetails(false)}>Ocultar detalhes</button> : <   button onClick={() => setShowDetails(true)}>ver detalhes</button>}
                        </section>
                        {showDetails &&
                            <>
                                <section>
                                    <h2>Indicadores de Desempenho</h2>
                                    {selectAssessment.map((assessment, index) => (
                                        <div key={index} className={style.modalCard}>
                                            <p><strong>{assessment.title}:</strong> {assessment.text}</p>
                                            {(assessment.value > 3 && assessment.value <= 4) && <p className={style.resultLabel}>Acima do Esperado</p>}
                                            {(assessment.value > 2 && assessment.value <= 3) && <p className={style.resultLabel}>Atinge o Esperado</p>}
                                            {(assessment.value > 1.5 && assessment.value <= 2) && <p className={style.resultLabel}>Atinge Parcialmente o esperado</p>}
                                            {(assessment.value <= 1.5) && <p className={style.resultLabel}>Abaixo do Esperado</p>}
                                        </div>
                                    ))}
                                </section>
                                <section>
                                    <h2>Informações Adicionais do Gestor</h2>
                                    <p>{selectAssessment[0].description}</p>
                                </section>
                                <section>
                                    <h2>Informações Adicionais do Colaborador</h2>
                                    <p>{selectAssessment[0].description_employee}</p>
                                </section>
                            </>
                        }
                    </section>
                }
            </ReactModal>
            <div className={style.content}>
                <Header />
                <main className={style.mainContent}>
                    <h1>Consultar Avaliações</h1>
                    {showManagerField &&
                        <>
                            <form className={style.form} onSubmit={(e) => handleRegister(e)} >
                                <section className={style.checkRegister}>
                                    <p>Digite sua matrícula: </p>
                                    <div>
                                        <input type="number" value={register} onChange={(e) => setRegister(e.target.value)} />
                                        <button>Buscar</button>
                                    </div>
                                </section>
                            </form>
                            {!isValid && <p className={style.alertMessage}>Matricula invalida</p>}
                        </>
                    }
                    {showCodeField &&
                        <>
                            <form onSubmit={(e) => handleValidationCode(e)}>
                                <section className={style.checkRegister}>
                                    <div className={style.insertCodeField}>
                                        <p>Ensira o codigo de verificação enviado para o seu email cadastrado</p>
                                        <div>
                                            <input type="number" value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
                                            <button>Buscar</button>
                                        </div>
                                    </div>
                                </section>
                            </form>
                            {!isCodeValid && <p className={style.alertMessage}>O código inserido é inválido</p>}
                        </>
                    }
                    {showAssessment &&
                        <>
                            <section className={style.managerInfo}>
                                {manager.length !== 0 &&
                                    <div className={style.managerInfo}>
                                        <p><strong>Nome do Avaliador:</strong> {manager[0].name}</p>
                                        <p><strong>Cargo:</strong> {manager[0].position}</p>
                                    </div>
                                }
                                <button onClick={()=>setShowFilter(!showFilter)} className={style.filterButton}>Filtrar</button>
                            </section>
                            {showFilter && <section className={style.filter}>
                                <p>Por colaborador: </p>
                                <select onChange={(e) => setSelectEmployee(e.target.value)}>
                                    <option value="" >Todos</option>
                                    {employees.map((employee) => (
                                        <option key={employee.register} value={employee.register}>{employee.name}</option>
                                    ))}
                                </select>
                                <p>Por data</p>
                                <div className={style.insertDate}>
                                    <div>
                                        <label>Inicio</label>
                                        <input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Fim</label>
                                        <input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
                                    </div>
                                    <button onClick={()=>handleFilter()}>Buscar</button>
                                </div>
                                {!isFilterValid && <p className={style.alertMessage}>Preencha o campos de {errorMensage} corretamente</p>}
                            </section>}
                            <section>
                                {assessment.map(item => (
                                    <div onClick={() => setModalIsOpenToTrue(item.id_assessment)} className={style.cardConsult} key={item.id_assessment}>
                                        <p>Colaborador: {item.name}</p>
                                        <p>Data: {new Intl.DateTimeFormat('pt-BR').format(new Date(item.date_time))}</p>
                                        <p>{item.status == 0 ? "AGUARDANDO VALIDAÇÃO" : "VALIDADO"}</p>
                                    </div>
                                ))}
                            </section>
                        </>
                    }
                </main>
            </div>
        </div>
    )
}
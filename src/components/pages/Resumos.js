import React from 'react';
import Navbar from '../views/Navbar';
import './Resumos.css';

const Resumos = () => {
    return (
        <div>
            <Navbar />
            <ul id="modelo" className="list-group">
                <li className="list-group-item"><a href="Parecer Jurídico.pdf" download>Parecer Jurídico</a></li>
                <li className="list-group-item"><a href="Consulta Tributária.pdf" download>Consulta Tributária</a></li>
                <li className="list-group-item"><a href="Defesa Administrativa.pdf" download>Defesa Administrativa</a></li>
                <li className="list-group-item"><a href="Impugnação de Auto de Infração.pdf" download>Impugnação de Auto de Infração</a></li>
                <li className="list-group-item"><a href="Recurso Administrativo.pdf" download>Recurso Administrativo</a></li>
                <li className="list-group-item"><a href="Mandado de Segurança.pdf" download>Mandado de Segurança</a></li>
                <li className="list-group-item"><a href="Ação Anulatória de Débito Fiscal.pdf" download>Ação Anulatória de Débito Fiscal</a></li>
                <li className="list-group-item"><a href="Ação Declaratória de Inexistência de Relação Jurídico-Tributária.pdf" download>Ação Declaratória de Inexistência de Relação Jurídico-Tributária</a></li>
                <li className="list-group-item"><a href="Embargos à Execução Fiscal.pdf" download>Embargos à Execução Fiscal</a></li>
                <li className="list-group-item"><a href="Medida Cautelar Fiscal.pdf" download>Medida Cautelar Fiscal</a></li>
                <li className="list-group-item"><a href="Agravo de Instrumento em Matéria Tributária.pdf" download>Agravo de Instrumento em Matéria Tributária</a></li>
                <li className="list-group-item"><a href="Recurso Especial em Matéria Tributária.pdf" download>Recurso Especial em Matéria Tributária</a></li>
                <li className="list-group-item"><a href="Recurso Extraordinário em Matéria Tributária.pdf" download>Recurso Extraordinário em Matéria Tributária</a></li>
                <li className="list-group-item"><a href="Ação de Repetição de Indébito.pdf" download>Ação de Repetição de Indébito</a></li>
                <li className="list-group-item"><a href="Ação de Consignação em Pagamento.pdf" download>Ação de Consignação em Pagamento</a></li>
            </ul>                   
        </div>
    );
}

export default Resumos;
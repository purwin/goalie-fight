import React from 'react'
import styled from 'styled-components'

const GoalieTable = styled.table`
	width: 100%;
	text-align: left;
	border-collapse: collapse;
	overflow-x:auto;

	& th {
		color: #0066E5;
		font-weight: 400;
	}

	& tbody tr:hover {
		background: #B3D5FF;
	}

	& th:nth-child(1) {
		padding-left: .5rem;
	}

	& th:nth-child(3),
	& td:nth-child(3) {
		text-align: right;
		padding-right: .5rem;
	}
`;

const TableRowSpace = styled.tr`
  & * {
    padding-top: 1rem;
  }
`;


const StatsTable = ({goalie, rankTotal}) => {

	const {stats, rank} = goalie;

	return(
		<GoalieTable>
			<thead>
				<tr>
					<th></th>
					<th>Value</th>
					<th>Rank/{rankTotal}</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>GP</th>
					<td>{stats.gp}</td>
					<td>{rank.gp}</td>
				</tr>
				<tr>
					<th>TOI</th>
					<td>{parseInt(stats.toi)}:{(`0` + parseInt((stats.toi - parseInt(stats.toi)) * 60)).slice(-2)}</td>
					<td>{rank.toi}</td>
				</tr>
				<tr>
					<th>SHOTS</th>
					<td>{stats.sa}</td>
					<td>{rank.sa}</td>
				</tr>
				<tr>
					<th>SHOTS/60</th>
					<td>{(stats.sa / stats.toi * 60).toFixed(3)}</td>
					<td>{rank.sa}</td>
				</tr>
				<TableRowSpace>
					<th>&#x2004;&#x2004;SV%</th>
					<td>{stats.sv.toFixed(3)}</td>
					<td>{rank.sv}</td>
				</TableRowSpace>
				<tr>
					<th>xSV%</th>
					<td>{stats.xsv.toFixed(3)}</td>
					<td>{rank.xsv}</td>
				</tr>
				<tr>
					<th>dSV%</th>
					<td>{stats.dsv.toFixed(3)}</td>
					<td>{rank.dsv}</td>
				</tr>
				<TableRowSpace>
					<th>GSAA</th>
					<td>{stats.gsaa.toFixed(3)}</td>
					<td>{rank.gsaa}</td>
				</TableRowSpace>
				<tr>
					<th>GSAA/60</th>
					<td>{stats.gsaa60.toFixed(3)}</td>
					<td>{rank.gsaa60}</td>
				</tr>
				<TableRowSpace>
					<th>HDSV%</th>
					<td>{stats.hdsv.toFixed(3)}</td>
					<td>{rank.hdsv}</td>
				</TableRowSpace>
				<tr>
					<th>HDGSAA</th>
					<td>{stats.hdgsaa.toFixed(3)}</td>
					<td>{rank.hdgsaa}</td>
				</tr>
				<tr>
					<th>HDGSAA/60</th>
					<td>{stats.hdgsaa60.toFixed(3)}</td>
					<td>{rank.hdgsaa60}</td>
				</tr>
			</tbody>
		</GoalieTable>
	)
};

export default StatsTable
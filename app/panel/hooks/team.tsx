"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Team } from "@/lib/types";
import { teams } from "@/app/example-data";

const useTeamState = () => useState<Team | null>(null);
const TeamContext = createContext<ReturnType <typeof useTeamState> | null>(null);

export const useTeam = () => {
	const team = useContext(TeamContext);
	if(!team) throw new Error("useTeam must be used within a TeamProvider");
	return team[0];
};

export const useTeamContext = () => {
	const context = useContext(TeamContext);
	if(!context) throw new Error("useTeam must be used within a TeamProvider");
	return context;
};

export const TeamProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
	const [team, setTeam] = useTeamState();

	return (
		<TeamContext.Provider value={[team, setTeam]}>
			{ children }
		</TeamContext.Provider>
	);
};

export const TeamUpdater = ({ children, teamPath }: Readonly<{ children: React.ReactNode; teamPath: string; }>) => {
	const [, setTeam] = useTeamContext();

	useEffect(() => {
		setTeam(teams.find((team) => team.path === teamPath) || teams[0]);
	}, [setTeam, teamPath]);

	return (
		<>{ children }</>
	);
};

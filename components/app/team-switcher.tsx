"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getPlan, getPrimaryChars } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { teams } from "@/app/example-data";
import { useRouter } from "next/navigation";
import { useTeam } from "@/app/panel/hooks/team";
import { Skeleton } from "@/components/ui/skeleton";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const selectedTeam = useTeam();
	const isLoading = selectedTeam === null;
	const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [newTeamName, setNewTeamName] = useState("");

	const [personalTeam, ...otherTeams] = teams;

	const btn = useRef<HTMLButtonElement>(null);

	return (
		<Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						aria-label="Select a team"
						className={cn("w-[200px] justify-between px-[13px]", className)}
						ref={btn}
					>
						{
							isLoading
								? (
									<Skeleton className="h-5 w-5 mr-[11px] rounded-full" />
								)
								: (
									<Avatar className="h-5 w-5 mr-[11px]">
										<AvatarFallback className={cn("text-[10px] font-semibold", getPlan(selectedTeam).color)}>{ getPrimaryChars(selectedTeam.name) }</AvatarFallback>
									</Avatar>
								)
						}
						{ isLoading ? <Skeleton className="h-2 w-28" /> : selectedTeam.name }
						<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0" style={{ width: `${btn.current?.clientWidth || "200"}px` }}>
					<Command>
						<CommandList>
							<CommandInput placeholder="Search team..." onValueChange={setSearchQuery} />
							<CommandEmpty>
								{ "No teams found" }
								<Button
									variant="outline" className="mt-4" onClick={
										() => {
											setOpen(false);
											setNewTeamName(searchQuery);
											setShowNewTeamDialog(true);
										}
									}
								>
									<Plus className="mr-2 h-5 w-5" />
									{ "Create new Team" }
								</Button>
							</CommandEmpty>
							<CommandGroup heading="Personal">
								<CommandItem
									value={personalTeam.path}
									onSelect={
										() => {
											router.push(`/panel/${personalTeam.path}`);
											setOpen(false);
										}
									}
									className="text-sm"
								>
									<Avatar className="mr-2 h-5 w-5">
										<AvatarFallback className={cn("text-[10px] font-semibold", getPlan(personalTeam).color)}>{ getPrimaryChars(personalTeam.name) }</AvatarFallback>
									</Avatar>
									{ personalTeam.name }
									<Check
										className={cn("ml-auto h-4 w-4", !isLoading && (selectedTeam.id === personalTeam.id) ? "opacity-100" : "opacity-0")}
									/>
								</CommandItem>
							</CommandGroup>
							<CommandGroup heading="Teams">
								{
									otherTeams.map((team) => (
										<CommandItem
											key={team.id}
											value={team.path}
											onSelect={
												() => {
													router.push(`/panel/${team.path}`);
													setOpen(false);
												}
											}
											className="text-sm"
										>
											<Avatar className="mr-2 h-5 w-5">
												<AvatarFallback className={cn("text-[10px] font-semibold", getPlan(team).color)}>{ getPrimaryChars(team.name) }</AvatarFallback>
											</Avatar>
											{ team.name }
											<Check
												className={cn("ml-auto h-4 w-4", !isLoading && (selectedTeam.id === team.id) ? "opacity-100" : "opacity-0")}
											/>
										</CommandItem>
									))
								}
							</CommandGroup>
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem
										onSelect={
											() => {
												setOpen(false);
												setShowNewTeamDialog(true);
											}
										}
									>
										<Plus className="mr-2 h-5 w-5" strokeWidth={1.5} />
										{ "Create Team" }
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{ "Create team" }</DialogTitle>
					<DialogDescription>{ "Add a new team to manage your servers collaboratively" }</DialogDescription>
				</DialogHeader>
				<div>
					<div className="space-y-4 py-2 pb-4">
						<div className="space-y-2">
							<Label htmlFor="name">{ "Team name" }</Label>
							<Input id="name" placeholder="Monsters Inc." value={newTeamName} onChange={(ev) => setNewTeamName(ev.target.value)} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="plan">{ "Plan" }</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select a plan" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="free">
										<span className="font-medium">{ "Free" }</span>
										{ " - " }
										<span className="text-muted-foreground">{ "No billing information required" }</span>
									</SelectItem>
									<SelectItem value="plus">
										<span className="font-medium">{ "Plus" }</span>
										{ " - " }
										<span className="text-muted-foreground">{ "First month free, then $5.99 recurring" }</span>
									</SelectItem>
									<SelectItem value="pro">
										<span className="font-medium">{ "Pro" }</span>
										{ " - " }
										<span className="text-muted-foreground">{ "Previously $19.99, now only $12.99" }</span>
									</SelectItem>
									<SelectItem value="enterprise">
										<span className="font-medium">{ "Enterprise" }</span>
										{ " - " }
										<span className="text-muted-foreground">{ "$19.99/month, plus $3.99/month per seat" }</span>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
						{ "Cancel" }
					</Button>
					<Button type="submit">{ "Continue" }</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

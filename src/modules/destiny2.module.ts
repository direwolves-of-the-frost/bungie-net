import {Module} from '../module';
import {BungieMembershipType} from '../schemas';
import {DestinyComponentType} from '../schemas/destiny';
import {DestinyManifest} from '../schemas/destiny/config';
import {DestinyDefinition} from '../schemas/destiny/definitions';
import {DestinyMilestoneDefinition} from '../schemas/destiny/definitions/milestones';
import {DestinyMilestone} from '../schemas/destiny/milestones';
import {DestinyCharacterResponse, DestinyProfileResponse} from '../schemas/destiny/responses';
import {UserInfoCard} from '../schemas/user';

export class Destiny2Module extends Module {
	public getDestinyManifest(): Promise<DestinyManifest> {
		return this.client.get('Destiny2/Manifest');
	}

	public getDestinyEntityDefinition<T = DestinyDefinition>(entityType: string, itemHash: number): Promise<T> {
		return this.client.get(`Destiny2/Manifest/${entityType}/${itemHash}`);
	}

	public getDestinyMilestoneDefinition(milestoneHash: number): Promise<DestinyMilestoneDefinition> {
		return this.getDestinyEntityDefinition<DestinyMilestoneDefinition>('DestinyMilestoneDefinition', milestoneHash);
	}

	public searchDestinyPlayer(displayName: string, membershipType: BungieMembershipType = BungieMembershipType.All): Promise<UserInfoCard[]> {
		return this.client.get(`Destiny2/SearchDestinyPlayer/${BungieMembershipType[membershipType]}/${displayName}`);
	}

	public getProfile(membershipType: BungieMembershipType, membershipId: string, components: DestinyComponentType[] = [DestinyComponentType.Profiles]): Promise<DestinyProfileResponse> {
		return this.client.get(`Destiny2/${BungieMembershipType[membershipType]}/Profile/${membershipId}`, {
			components: components.join(','),
		});
	}

	public getCharacter(membershipType: BungieMembershipType, membershipId: string, characterId: string, components: DestinyComponentType[] = [DestinyComponentType.Characters]): Promise<DestinyCharacterResponse> {
		return this.client.get(`Destiny2/${BungieMembershipType[membershipType]}/Profile/${membershipId}/Character/${characterId}`, {
			components: components.join(','),
		});
	}

	public getClanWeeklyRewardState(groupId: number): Promise<DestinyMilestone> {
		return this.client.get(`Destiny2/Clan/${groupId}/WeeklyRewardState`);
	}
}

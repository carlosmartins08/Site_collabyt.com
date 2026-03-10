import { expect, test } from 'vitest';
import { TEAM_MEMBERS, isValidLinkedInProfileUrl } from '../siteConfig';

test('all configured team LinkedIn URLs match the expected profile pattern', () => {
  for (const member of TEAM_MEMBERS) {
    if (!member.linkedinUrl) {
      continue;
    }

    expect(isValidLinkedInProfileUrl(member.linkedinUrl)).toBe(true);
  }
});

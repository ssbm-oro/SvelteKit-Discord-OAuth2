import { json, type RequestHandler } from '@sveltejs/kit';
import { fetchSession } from '$lib/utils/sessionHandler';
import type { APIUser } from 'discord-api-types/v10';
import cookie from 'cookie';

export const POST: RequestHandler = async ({ request }) => {
    let cookies = cookie.parse(request.headers.get('cookie') || '')
    let sessionId = cookies['session_id'];

    if (!sessionId) return json({ error: 'Property "sessionId" is required.' }, {
        status: 400
    });

    const session = fetchSession(sessionId);
    if (!session) return json({ error: 'Invalid session.' }, {
        status: 400
    });

    const { access_token, token_type, refresh_token, expires_in, scope, ...apiUser} = session;
    
    return json(apiUser);
}

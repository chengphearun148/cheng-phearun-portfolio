//#region node_modules/.nitro/vite/services/ssr/assets/portfolio-types-BvpfSg7i.js
function projectImageSrc(project) {
	if (project.imageId) return `/api/media/${project.imageId}`;
	return project.imageUrl;
}
function profileImageSrc(profile) {
	if (profile.profileImageId) return `/api/media/${profile.profileImageId}`;
	return profile.profileImageUrl || "/profile.jpg";
}
//#endregion
export { projectImageSrc as n, profileImageSrc as t };

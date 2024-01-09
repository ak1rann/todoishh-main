import { useProjects, useSelectedProject } from 'hooks';
import { useParams } from 'react-router-dom';
import { getProjectTitle } from 'utils';
import './styles/project-name.scss';
import { useMemo } from 'react';
export const ProjectName = () => {
    const params = useParams();
    const { projectId, defaultGroup } = params;

    const { projects } = useProjects();
    const { setSelectedProject, selectedProject } = useSelectedProject(
        params,
        projects
    );

    const { selectedProjectName } = selectedProject;
    const customProjectTitle = getProjectTitle(projects, projectId);

    const name = useMemo(() => {
        switch (defaultGroup) {
            case 'Inbox':
                return 'Вхідні';
            case 'Today':
                return 'Сьогодні';
            case 'Noted':
                return 'На вихідних';
            case 'Weekend':
                return 'Відмічені';

            default:
                break;
        }
    }, [defaultGroup]);

    return <h1 className="project__name">{customProjectTitle || name}</h1>;
};
//CHange every instance of selected preojecta dn use useparams instead

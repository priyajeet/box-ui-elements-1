import React from 'react';
import { shallow } from 'enzyme';
import LoadingIndicator from 'box-react-ui/lib/components/loading-indicator/LoadingIndicator';
import LoadingIndicatorWrapper from 'box-react-ui/lib/components/loading-indicator/LoadingIndicatorWrapper';
import Instances from 'box-react-ui/lib/features/metadata-instance-editor/Instances';
import EmptyContent from 'box-react-ui/lib/features/metadata-instance-editor/EmptyContent';
import InlineError from 'box-react-ui/lib/components/inline-error/InlineError';
import { MetadataSidebarComponent as MetadataSidebar } from '../MetadataSidebar';
import { FIELD_IS_EXTERNALLY_OWNED, FIELD_PERMISSIONS } from '../../../constants';
import messages from '../../messages';

describe('components/ContentSidebar/Metadata/MetadataSidebar', () => {
    const getWrapper = (props, options) => shallow(<MetadataSidebar {...props} />, options);

    test('should render Metadata sidebar component when instances and templates are available', () => {
        const getFile = jest.fn();
        const api = {
            getFileAPI: jest.fn().mockReturnValueOnce({
                getFile,
            }),
        };
        const wrapper = getWrapper({
            api,
        });
        wrapper.setState({ file: {}, templates: [], editors: [{}] });
        expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(1);
        expect(wrapper.find(Instances)).toHaveLength(1);
        expect(wrapper.find(EmptyContent)).toHaveLength(0);
        expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
        expect(wrapper.find(InlineError)).toHaveLength(0);
        expect(wrapper).toMatchSnapshot();
        expect(getFile).toHaveBeenCalled();
        expect(api.getFileAPI).toHaveBeenCalled();
    });

    test('should render Metadata sidebar component with template add dropdown', () => {
        const getFile = jest.fn();
        const api = {
            getFileAPI: jest.fn().mockReturnValueOnce({
                getFile,
            }),
        };
        const wrapper = getWrapper({
            api,
        });
        wrapper.setState({ file: { permissions: { can_upload: true } }, templates: [], editors: [{}] });
        expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(1);
        expect(wrapper.find(Instances)).toHaveLength(1);
        expect(wrapper.find(EmptyContent)).toHaveLength(0);
        expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
        expect(wrapper.find(InlineError)).toHaveLength(0);
        expect(wrapper).toMatchSnapshot();
        expect(getFile).toHaveBeenCalled();
        expect(api.getFileAPI).toHaveBeenCalled();
    });

    test('should render Metadata sidebar component with empty content when instances are empty', () => {
        const getFile = jest.fn();
        const api = {
            getFileAPI: jest.fn().mockReturnValueOnce({
                getFile,
            }),
        };
        const wrapper = getWrapper({
            api,
        });
        wrapper.setState({ file: {}, templates: [], editors: [] });
        expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(1);
        expect(wrapper.find(Instances)).toHaveLength(0);
        expect(wrapper.find(EmptyContent)).toHaveLength(1);
        expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
        expect(wrapper.find(InlineError)).toHaveLength(0);
        expect(wrapper).toMatchSnapshot();
        expect(getFile).toHaveBeenCalled();
        expect(api.getFileAPI).toHaveBeenCalled();
    });

    test('should render loading indicator component when templates are not available', () => {
        const getFile = jest.fn();
        const api = {
            getFileAPI: jest.fn().mockReturnValueOnce({
                getFile,
            }),
        };
        const wrapper = getWrapper({
            api,
        });
        wrapper.setState({ file: {}, editors: [] });
        expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(0);
        expect(wrapper.find(Instances)).toHaveLength(0);
        expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
        expect(wrapper.find(InlineError)).toHaveLength(0);
        expect(wrapper).toMatchSnapshot();
        expect(getFile).toHaveBeenCalled();
        expect(api.getFileAPI).toHaveBeenCalled();
    });

    test('should render loading indicator component when instances are not available', () => {
        const getFile = jest.fn();
        const api = {
            getFileAPI: jest.fn().mockReturnValueOnce({
                getFile,
            }),
        };
        const wrapper = getWrapper({
            api,
        });
        wrapper.setState({ file: {}, templates: [] });
        expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(0);
        expect(wrapper.find(Instances)).toHaveLength(0);
        expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
        expect(wrapper.find(InlineError)).toHaveLength(0);
        expect(wrapper).toMatchSnapshot();
        expect(getFile).toHaveBeenCalled();
        expect(api.getFileAPI).toHaveBeenCalled();
    });

    test('should render loading indicator component when file is not available', () => {
        const getFile = jest.fn();
        const api = {
            getFileAPI: jest.fn().mockReturnValueOnce({
                getFile,
            }),
        };
        const wrapper = getWrapper({
            api,
        });
        wrapper.setState({ templates: [], editors: [] });
        expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(0);
        expect(wrapper.find(Instances)).toHaveLength(0);
        expect(wrapper.find(LoadingIndicator)).toHaveLength(1);
        expect(wrapper.find(InlineError)).toHaveLength(0);
        expect(wrapper).toMatchSnapshot();
        expect(getFile).toHaveBeenCalled();
        expect(api.getFileAPI).toHaveBeenCalled();
    });

    test('should render error when there was an error', () => {
        const getFile = jest.fn();
        const api = {
            getFileAPI: jest.fn().mockReturnValueOnce({
                getFile,
            }),
        };
        const wrapper = getWrapper({
            getViewer: jest.fn(),
            api,
        });
        wrapper.setState({ file: {}, error: {} });
        expect(wrapper.find(LoadingIndicatorWrapper)).toHaveLength(0);
        expect(wrapper.find(Instances)).toHaveLength(0);
        expect(wrapper.find(LoadingIndicator)).toHaveLength(0);
        expect(wrapper.find(InlineError)).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
        expect(getFile).toHaveBeenCalled();
        expect(api.getFileAPI).toHaveBeenCalled();
    });

    describe('componentDidMount()', () => {
        test('should call fetch file', () => {
            const getFile = jest.fn();
            const api = {
                getFileAPI: jest.fn().mockReturnValueOnce({
                    getFile,
                }),
            };
            getWrapper({
                api,
            });
            expect(getFile).toHaveBeenCalled();
            expect(api.getFileAPI).toHaveBeenCalled();
        });
    });

    describe('commonErrorCallback()', () => {
        test('should set error state and call onError', () => {
            const error = { status: 429 }; // user correctable error
            const code = 'code';
            const onError = jest.fn();
            const wrapper = getWrapper(
                {
                    onError,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            const editors = [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }];
            wrapper.setState({ editors });
            instance.setState = jest.fn();
            instance.commonErrorCallback(error, code, { foo: 'bar' });
            expect(instance.setState).toBeCalledWith({
                error: messages.sidebarMetadataEditingErrorContent,
                isLoading: false,
                foo: 'bar',
            });
            expect(onError).toBeCalledWith(error, code, {
                error,
                isErrorDisplayed: true,
            });
        });
    });

    describe('canEdit()', () => {
        test('should return false when no file', () => {
            const wrapper = getWrapper(
                {},
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            expect(instance.canEdit()).toBeFalsy();
        });

        test('should return false when can_upload is missing', () => {
            const wrapper = getWrapper(
                {},
                {
                    disableLifecycleMethods: true,
                },
            );
            wrapper.setState({
                file: {
                    permissions: {},
                },
            });
            const instance = wrapper.instance();
            expect(instance.canEdit()).toBeFalsy();
        });

        test('should return false when can_upload is true', () => {
            const wrapper = getWrapper(
                {},
                {
                    disableLifecycleMethods: true,
                },
            );
            wrapper.setState({
                file: {
                    permissions: {
                        can_upload: true,
                    },
                },
            });
            const instance = wrapper.instance();
            expect(instance.canEdit()).toBeTruthy();
        });
    });

    describe('getEditor()', () => {
        test('should return the correct editor', () => {
            const getEditors = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValueOnce({
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    getViewer: jest.fn(),
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const editors = [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }];
            wrapper.setState({ editors });
            const instance = wrapper.instance();
            expect(instance.getEditor(2)).toBe(editors[1]);
        });
    });

    describe('onRemoveSuccessHandler()', () => {
        test('should remove the correct editor', () => {
            const getEditors = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValueOnce({
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    getViewer: jest.fn(),
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            const editors = [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }];
            wrapper.setState({ editors });
            instance.setState = jest.fn();
            instance.onRemoveSuccessHandler(editors[1]);
            expect(instance.setState).toBeCalledWith({
                editors: [{ instance: { id: 1 } }, { instance: { id: 3 } }],
            });
        });
    });

    describe('onRemove()', () => {
        test('should not do anything if editor not found', () => {
            const getEditors = jest.fn();
            const deleteMetadata = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValueOnce({
                    deleteMetadata,
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            const editors = [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }];
            wrapper.setState({ editors });
            instance.setState = jest.fn();
            instance.onRemove(5);
            expect(deleteMetadata).not.toBeCalled();
        });

        test('should not do anything if no file object', () => {
            const getEditors = jest.fn();
            const deleteMetadata = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValueOnce({
                    deleteMetadata,
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            const editors = [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }];
            wrapper.setState({ editors });
            instance.setState = jest.fn();
            instance.onRemove(1);
            expect(deleteMetadata).not.toBeCalled();
        });
        test('should call metadata delete api', () => {
            const file = { id: 'fileId' };
            const getEditors = jest.fn();
            const deleteMetadata = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValue({
                    deleteMetadata,
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    file,
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            const editors = [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }];
            wrapper.setState({ editors, file });
            instance.setState = jest.fn();
            instance.onRemove(1);
            expect(deleteMetadata).toBeCalledWith(
                file,
                editors[1].template,
                expect.any(Function),
                instance.commonErrorCallback,
            );
        });
    });

    describe('onAddSuccessHandler()', () => {
        test('should add the new editor', () => {
            const getEditors = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValueOnce({
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            wrapper.setState({
                editors: [{ instance: { id: 1 } }, { instance: { id: 2 } }],
            });
            instance.setState = jest.fn();
            instance.onAddSuccessHandler({ instance: { id: 3 } });
            expect(instance.setState).toBeCalledWith({
                isLoading: false,
                editors: [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }],
            });
        });
    });

    describe('onAdd()', () => {
        test('should not call metadata add api when no file object', () => {
            const getEditors = jest.fn();
            const createMetadata = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValue({
                    createMetadata,
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            instance.setState = jest.fn();
            instance.onAdd('template');
            expect(createMetadata).not.toBeCalled();
            expect(instance.setState).not.toBeCalled();
        });

        test('should call metadata add api', () => {
            const file = { id: 'fileId' };
            const getEditors = jest.fn();
            const createMetadata = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValue({
                    createMetadata,
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    file,
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            wrapper.setState({ file });
            const instance = wrapper.instance();
            instance.setState = jest.fn();
            instance.onAdd('template');
            expect(createMetadata).toBeCalledWith(
                file,
                'template',
                instance.onAddSuccessHandler,
                instance.commonErrorCallback,
            );
            expect(instance.setState).toBeCalledWith({
                isLoading: true,
            });
        });
    });

    describe('onSaveSuccessHandler()', () => {
        test('should update the correct editor', () => {
            const getEditors = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValueOnce({
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            const editors = [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }];
            wrapper.setState({ editors });
            instance.setState = jest.fn();
            instance.onSaveSuccessHandler(editors[1], { instance: { id: 5 } });
            expect(instance.setState).toBeCalledWith({
                editors: [{ instance: { id: 1 } }, { instance: { id: 5 } }, { instance: { id: 3 } }],
            });
        });
    });

    describe('onSaveErrorHandler()', () => {
        test('should revert to the old editor', () => {
            const error = { status: 429 }; // user correctable error
            const code = 'code';
            const oldEditor = { foo: 'bar' };
            const wrapper = getWrapper(
                {},
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            instance.onSaveSuccessHandler = jest.fn();
            instance.commonErrorCallback = jest.fn();
            instance.onSaveErrorHandler(oldEditor, error, code);
            expect(instance.onSaveSuccessHandler).toBeCalledWith(oldEditor, { foo: 'bar', hasError: true });
            expect(instance.commonErrorCallback).toBeCalledWith(error, code);
        });
    });

    describe('onSave()', () => {
        test('should not do anything if editor not found', () => {
            const getEditors = jest.fn();
            const updateMetadata = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValueOnce({
                    updateMetadata,
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            wrapper.setState({
                editors: [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }],
            });
            instance.setState = jest.fn();
            instance.onSave(5, {});
            expect(updateMetadata).not.toBeCalled();
        });

        test('should not do anything if no file', () => {
            const getEditors = jest.fn();
            const updateMetadata = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValueOnce({
                    updateMetadata,
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            wrapper.setState({
                editors: [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }],
            });
            instance.setState = jest.fn();
            instance.onSave(1, {});
            expect(updateMetadata).not.toBeCalled();
        });

        test('should call metadata save api', () => {
            const file = { id: 'fileId' };
            const getEditors = jest.fn();
            const updateMetadata = jest.fn();
            const getMetadataAPI = jest.fn().mockReturnValue({
                updateMetadata,
                getEditors,
            });
            const wrapper = getWrapper(
                {
                    file,
                    api: { getMetadataAPI },
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            const editors = [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }];
            wrapper.setState({ editors, file });
            instance.setState = jest.fn();
            instance.onSave(1, 'ops');
            expect(getMetadataAPI).toBeCalledWith(false);
            expect(updateMetadata).toBeCalledWith(
                file,
                editors[1].template,
                'ops',
                expect.any(Function),
                expect.any(Function),
            );
        });
    });

    describe('onModification()', () => {
        test('should not do anything if editor not found', () => {
            const getEditors = jest.fn();
            const updateMetadata = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValueOnce({
                    updateMetadata,
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            wrapper.setState({
                editors: [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }],
            });
            instance.setState = jest.fn();
            instance.onModification(5, {});
            expect(updateMetadata).not.toBeCalled();
        });
        test('should call metadata save api', () => {
            const getEditors = jest.fn();
            const updateMetadata = jest.fn();
            const api = {
                getMetadataAPI: jest.fn().mockReturnValue({
                    updateMetadata,
                    getEditors,
                }),
            };
            const wrapper = getWrapper(
                {
                    api,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            const editors = [{ instance: { id: 1 } }, { instance: { id: 2 } }, { instance: { id: 3 } }];
            wrapper.setState({ editors });
            instance.setState = jest.fn();
            instance.onModification(1, true);
            expect(instance.setState).toBeCalledWith({
                editors: [{ instance: { id: 1 }, isDirty: true }, { instance: { id: 2 } }, { instance: { id: 3 } }],
            });
        });
    });

    describe('fetchFile()', () => {
        test('should call file api with correct options', () => {
            const getFile = jest.fn();
            const wrapper = getWrapper(
                {
                    fileId: 'fileId',
                    api: {
                        getFileAPI: jest.fn().mockReturnValueOnce({
                            getFile,
                        }),
                    },
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            instance.componentDidMount = jest.fn();
            instance.fetchFile();
            expect(getFile).toBeCalledWith(
                'fileId',
                instance.fetchFileSuccessCallback,
                instance.fetchFileErrorCallback,
                {
                    fields: [FIELD_IS_EXTERNALLY_OWNED, FIELD_PERMISSIONS],
                    refreshCache: true,
                },
            );
        });
    });

    describe('fetchFileSuccessCallback()', () => {
        test('should set state with the new file object', () => {
            const wrapper = getWrapper(
                {
                    fileId: 'fileId',
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const file = { id: 'fileId' };
            const instance = wrapper.instance();
            instance.setState = jest.fn();
            instance.fetchFileSuccessCallback(file);
            expect(instance.setState).toBeCalledWith({ file }, instance.fetchMetadata);
        });
    });

    describe('fetchFileErrorCallback()', () => {
        test('should call the common error callback with file fetch error', () => {
            const wrapper = getWrapper(
                {
                    fileId: 'fileId',
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const e = new Error();
            const code = 'code';
            const instance = wrapper.instance();
            instance.commonErrorCallback = jest.fn();
            instance.fetchFileErrorCallback(e, code);
            expect(instance.commonErrorCallback).toBeCalledWith(e, code, {
                error: messages.sidebarFileFetchingErrorContent,
                file: undefined,
            });
        });
    });

    describe('fetchMetadata()', () => {
        test('should not call the metadata api when no file', () => {
            const getMetadata = jest.fn();
            const getMetadataAPI = jest.fn().mockReturnValueOnce({
                getMetadata,
            });
            const wrapper = getWrapper(
                {
                    fileId: 'fileId',
                    api: { getMetadataAPI },
                    isFeatureEnabled: false,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            instance.fetchMetadata();
            expect(getMetadataAPI).not.toBeCalled();
            expect(getMetadata).not.toBeCalled();
        });

        test('should call metadata api with correct options', () => {
            const file = { id: 'fileId' };
            const getMetadata = jest.fn();
            const getMetadataAPI = jest.fn().mockReturnValueOnce({
                getMetadata,
            });
            const wrapper = getWrapper(
                {
                    fileId: 'fileId',
                    api: { getMetadataAPI },
                    isFeatureEnabled: false,
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            wrapper.setState({ file });
            instance.fetchMetadata();
            expect(getMetadataAPI).toBeCalledWith(false);
            expect(getMetadata).toBeCalledWith(
                file,
                instance.fetchMetadataSuccessCallback,
                instance.fetchMetadataErrorCallback,
                false,
                { refreshCache: true },
            );
        });
    });

    describe('fetchMetadataSuccessCallback()', () => {
        test('should set state with the new file object', () => {
            const editors = ['editor1', 'editor2'];
            const templates = ['template1', 'template2'];
            const wrapper = getWrapper(
                {
                    fileId: 'fileId',
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const instance = wrapper.instance();
            instance.setState = jest.fn();
            instance.fetchMetadataSuccessCallback({
                editors,
                templates,
            });
            expect(instance.setState).toBeCalledWith({
                editors,
                error: undefined,
                isLoading: false,
                templates,
            });
        });
    });

    describe('fetchMetadataErrorCallback()', () => {
        test('should call the common error callback with file fetch error', () => {
            const wrapper = getWrapper(
                {
                    fileId: 'fileId',
                },
                {
                    disableLifecycleMethods: true,
                },
            );
            const e = new Error();
            const code = 'code';
            const instance = wrapper.instance();
            instance.commonErrorCallback = jest.fn();
            instance.fetchMetadataErrorCallback(e, code);
            expect(instance.commonErrorCallback).toBeCalledWith(e, code, {
                editors: undefined,
                error: messages.sidebarMetadataFetchingErrorContent,
                templates: undefined,
            });
        });
    });
});

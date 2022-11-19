import { kebabCase } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm as useBaseForm } from "react-hook-form";
import {
    useArchiveLeaderboardByUrlName,
    useCreateLeaderboard,
    useGetRankingMethods,
    useUpdateLeaderboardByUrlName,
} from "../../../api/leaderboards";
import themes from "../../../themes";

const useForm = (leaderboard) => {
    // Data
    const { data: rankingMethods = [], isFetching: isLoadingRankingMethods } =
        useGetRankingMethods();

    // Select options
    const rankingMethodsOptions = useMemo(() => {
        return rankingMethods.map((rm) => ({
            value: `${rm.rankingMethodsId}`,
            label: rm.name,
        }));
    }, [rankingMethods]);
    const themeOptions = useMemo(() => {
        let themeOptions = [];
        for (let themeKey in themes) {
            themeOptions = [
                ...themeOptions,
                {
                    value: themeKey,
                    label: themes[themeKey].name,
                },
            ];
        }
        return themeOptions;
    }, []);

    // Configure the form
    const {
        register,
        reset,
        control,
        watch,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useBaseForm({
        defaultValues: {
            name: leaderboard?.name ?? "",
            urlName: leaderboard?.urlName ?? "",
            rankingMethodsId: leaderboard?.rankingMethod?.rankingMethodsId
                ? `${leaderboard.rankingMethod.rankingMethodsId}`
                : null,
            theme: leaderboard?.theme ?? themeOptions[0].value,
        },
    });

    // URL name
    const [urlNameIsAutoGenerated, setUrlNameIsAutoGenerated] = useState(!leaderboard);
    const watchedName = watch("name");
    useEffect(() => {
        if (urlNameIsAutoGenerated) {
            setValue("urlName", kebabCase(watchedName));
        }
    }, [watchedName, urlNameIsAutoGenerated, setValue]);

    // Ranking method
    const watchedRankingMethodsId = watch("rankingMethodsId");
    useEffect(() => {
        if (!leaderboard && !watchedRankingMethodsId && rankingMethodsOptions.length > 0) {
            setValue("rankingMethodsId", rankingMethodsOptions[0].value);
        }
    }, [leaderboard, watchedRankingMethodsId, rankingMethodsOptions, setValue]);

    // Mutations
    const {
        mutate: createLeaderboard,
        isLoading: isCreatingLeaderboard,
        isSuccess: didCreateLeaderboard,
    } = useCreateLeaderboard();
    const {
        mutate: updateLeaderboard,
        isLoading: isUpdatingLeaderboard,
        isSuccess: didUpdateLeaderboard,
    } = useUpdateLeaderboardByUrlName();
    const {
        mutate: archiveLeaderboard,
        isLoading: isArchivingLeaderboard,
        isSuccess: didArchiveLeaderboard,
    } = useArchiveLeaderboardByUrlName();

    // Action management
    const isPerformingAction = useMemo(() => {
        return isCreatingLeaderboard || isUpdatingLeaderboard || isArchivingLeaderboard;
    }, [isCreatingLeaderboard, isUpdatingLeaderboard, isArchivingLeaderboard]);
    const didCompleteAction = useMemo(() => {
        return didCreateLeaderboard || didUpdateLeaderboard || didArchiveLeaderboard;
    }, [didCreateLeaderboard, didUpdateLeaderboard, didArchiveLeaderboard]);

    // Form errors
    const nameError = useMemo(() => {
        switch (errors?.name?.type) {
            case "required":
                return "Name is required";
            case "maxLength":
                return "Name is too long";
            default:
                return null;
        }
    }, [errors?.name?.type]);
    const urlNameError = useMemo(() => {
        switch (errors?.urlName?.type) {
            case "required":
                return "URL name is required";
            case "maxLength":
                return "URL name is too long";
            case "pattern":
                return "URL name can only contain letters, numbers, and hyphens";
            default:
                return null;
        }
    }, [errors?.urlName?.type]);
    const rankingMethodsIdError = useMemo(() => {
        switch (errors?.rankingMethodsId?.type) {
            case "required":
                return "Ranking method is required";
            default:
                return null;
        }
    }, [errors?.rankingMethodsId?.type]);
    const themeError = useMemo(() => {
        switch (errors?.theme?.type) {
            case "required":
                return "Theme is required";
            default:
                return null;
        }
    }, [errors?.theme?.type]);

    // Form reset
    const resetForm = useCallback(() => {
        reset();
    }, [reset]);

    // Form submission
    const handleFormSubmit = useCallback(
        (data) => {
            const payload = {
                name: data.name,
                urlName: data.urlName,
                rankingMethodsId: data.rankingMethodsId,
                theme: data.theme,
            };

            // Create / update users
            if (leaderboard) {
                updateLeaderboard({
                    ...payload,
                    existingUrlName: leaderboard.urlName,
                });
            } else {
                createLeaderboard(payload);
            }
        },
        [leaderboard, createLeaderboard, updateLeaderboard]
    );

    return {
        // Form
        register,
        control,
        resetForm,
        handleFormSubmit: handleSubmit(handleFormSubmit),

        // Select options
        rankingMethodsOptions,
        themeOptions,

        // URL name
        urlNameIsAutoGenerated,
        setUrlNameIsAutoGenerated,

        // Mutation
        createLeaderboard,
        updateLeaderboard,
        archiveLeaderboard,

        // Action management
        isLoadingRankingMethods,
        isPerformingAction,
        didCompleteAction,

        // Errors
        errors: {
            name: nameError,
            urlName: urlNameError,
            rankingMethodsId: rankingMethodsIdError,
            theme: themeError,
        },
    };
};

export default useForm;

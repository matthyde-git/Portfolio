/*********************************************************************************************************************************************************************************
    
File: executables.c

Date: 05/12/24

Description: This code is for the finding executable files of directories in the Linux operating system


*********************************************************************************************************************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <dirent.h>
#include <fcntl.h>
#include <errno.h>

#define BUFFER_SIZE (258)                                                       // size of the buffer that stores the command line args and the file names

int main(int argc, char *argv[])
{
    char *path = getenv("PATH");

    if ((argc > 1) && (strcmp(argv[1], path) != 0))                             // runs if there is more than one command line arg and the value of argv[1] is not the $PATH
    {
        DIR *dp = opendir(argv[1]);                                             // calls opendir on the directory passed as a command line arg

        if (dp == NULL)                                                         // if DIR returns NULL, an error has occurred
        {
            perror("Failed to open the directory");

            return EXIT_FAILURE;
        }
        
        char buffer[BUFFER_SIZE];

        struct dirent *entry;                                                   // struct for accessing the files and subdirectories within a directory

        errno = 0;                                                              // set errno to 0 before system call as readdir returns NULL when it's finished reading

        if ((entry = readdir(dp)) == NULL)                                      // if readdir returns NULL, an error has occurred
        {
            perror("Failed to read the directory");

            return EXIT_FAILURE;
        }

        while ((entry = readdir(dp)) != NULL)                                   // continues until it reaches the end of the directory
        {
            struct stat ab;                                                     // struct for accessing file attributes

            snprintf(buffer, BUFFER_SIZE, "%s/%s", argv[1], entry->d_name);     // buffer that stores the directory and its file names

            stat(buffer, &ab);                                                  // stores the directory and files into stat struct

            if ((S_ISREG(sb.st_mode) != 0) && (sb.st_mode & S_IXUSR))           // runs if the file is a regular file and the user has execute permissions
            {
                printf("%s\n", entry->d_name);                                  // prints the names of executable files
            }
        }

        closedir(dp);
    }
    else if ((argc == 1) || (strcmp(argv[1], path) == 0))                       // runs if there is no directory specified or if the argv[1] value equals the $PATH
    {
        DIR *dp = opendir("./");                                                // calls opendir on the current working directory

        if (dp == NULL)                                                         // if DIR returns NULL, an error has occurred
        {
            perror("Failed to open the directory");

            return EXIT_FAILURE;
        }

        char buffer[BUFFER_SIZE];

        struct dirent *entry;                                                   // struct for accessing the files and subdirectories within a directory

        errno = 0;                                                              // set errno to 0 before system call as readdir returns NULL when it's finished reading

        if ((entry = readdir(dp)) == NULL)                                      // if readdir returns NULL, an error has occurred
        {
            perror("Failed to read the directory");

            return EXIT_FAILURE;
        }

        while ((entry = readdir(dp)) != NULL)                                   // continues until it reaches the end of the directory
        {
            struct stat ab;                                                     // struct for accessing file attributes

            snprintf(buffer, BUFFER_SIZE, "./%s", entry->d_name);              // buffer that stores the directory and its file names

            stat(buffer, &ab);                                                  // stores the directory and files into stat struct

            if ((S_ISREG(sb.st_mode) != 0) && (sb.st_mode & S_IXUSR))           // runs if the file is a regular file and the user has execute permissions
            {
                printf("%s\n", entry->d_name);                                  // prints the names of executable files
            }
        }

        closedir(dp);
    }

    return EXIT_SUCCESS;
}
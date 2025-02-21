/*********************************************************************************************************************************************************************************
    
File: shell.c

Date: 29/11/24

Description: This code is for a basic shell for Linux operating systems


*********************************************************************************************************************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

char *cmd[5];                                                               // array to store the commands inputted by the user

void prompt()                                                               // function stores the name of the current directory, prints error if fails
{
    char cwd[40];                                                           // variable to hold the current working directory

    if (getcwd(cwd, sizeof(cwd)) != NULL)                                   // if an error occurs, getcwd returns NUll
    {
        printf("simpleShell%s/$ ", cwd);                                    // prints the shell prompt
    }
    else
    {
        perror("failed to get the current working directory");
    }
}

void shell()                                                                // function that retrieves user inputs and stores them in the cmd array
{
    char *tok;                                                              // char pointer to store tokens

    int i = 0;                                                              // int for interation

    int bufSize = 20;

    char *buf = malloc(sizeof(char) * bufSize);                             // buffer to store user input

    prompt();

    if (getline(&buf, &bufSize, stdin) < 0)                                 // stores the user input in the buffer, returns < 0 if an error occurs
    {
        perror("getline failed");
    }
    else
    {
        tok = strtok(buf, "\n");                                            // stores the line inputted by the user

        char *split;

        while ((split = strsep(&tok, " ")) != NULL)                         // splits the string by it's spaces, continues while there are still spaces in the string
        {
            cmd[i] = split;                                                 // stores the split string values in the cmd array

            i++;                                                            // increment to avoid overwritting array values
        }

        cmd[i++] = NULL;                                                    // stores a NULL terminator at the end of the cmd array
    }
}

int main()
{
    while(1)                                                                // runs until user exits shell
    {
        shell();

        if (strcmp(cmd[0], "cd") == 0)                                      // runs if the user enters a change directory command
        {
            if (chdir(cmd[1]) != 0)                                         // changes to the chosen directory, returns 0 if successful
            {
                perror("Failed to change directory");
            }

            continue;
        }

        if (strcmp(cmd[0], "exit") == 0)                                    //exits the shell if the user command equals exit
        {
            exit(0);
        }

        char file[] = {"/usr/bin/"};                                        // sets the pathname of the command

        strcat(file, cmd[0]);                                               // adds the user command to the end of the path

        cmd[0] = file;                                                      // copies the value of the pathname into the first command argument

        pid_t pid;                                                          // creates the parrent process

        pid = fork();                                                       // creates the child process

        if (pid < 0)                                                        // pid returns < 0 if an error occurs
        {
            perror("fork error");

            return EXIT_FAILURE;
        }

        if (pid != 0)                                                       // if the process is not the child process, wait for the parent process to finish
        {
            int status;

            if (waitpid(pid, &status, 0) < 0)                               // waitpid returns < 0 if an error occurs
            {
                perror("waitpid error");

                return EXIT_FAILURE;
            }
        }
        else
        {
            int execTest = execv(file, cmd);                                // executes the user command

            if (execTest < 0)                                               // execv returns < 0 if an error occurs
            {
                perror("command execution error");
            }
        }
    }
}